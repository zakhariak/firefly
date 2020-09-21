import { Component, OnInit, TemplateRef } from '@angular/core';
import { ITrademarks } from '../../shared/interfaces/trademarks.interface';
import { Trademarks } from '../../shared/models/trademarks.model';
import { TrademarkService } from '../../shared/services/trademark.service';
import { UploadImageService } from '../../shared/services/upload-image.service';
import { ScrollService } from '../../shared/services/scroll.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-trademarks',
  templateUrl: './admin-trademarks.component.html',
  styleUrls: ['./admin-trademarks.component.scss']
})
export class AdminTrademarksComponent implements OnInit {
  modalRef: BsModalRef;
  arrBrands: Array<ITrademarks>;
  id: string = '1';
  name: string;
  country: string;
  searchPlace: string;
  editStatus: boolean = false;
  tId: string;
  tPath: string;

  constructor(private trademarkService: TrademarkService,
    private uploadService: UploadImageService,
    private scrollService: ScrollService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  openDeleteModal(template: TemplateRef<any>, brand: ITrademarks) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm modal-dialog-centered' });
    this.tId = brand.id;
    this.tPath = brand.logo;
  }


  private getBrands(): void {
    this.trademarkService.getTrademarks().subscribe(
      collection => {
        this.arrBrands = collection.map(brand => {
          const data = brand.payload.doc.data() as ITrademarks;
          data.id = brand.payload.doc.id;
          return data
        })
      }
    )
  }


  btnDis() {
    if (this.name && this.country && this.uploadService.getImage()) {
      return false
    } else {
      return true
    }
  }

  private resetForm(): void {
    this.name = "";
    this.country = "";
    this.tPath = "";
    this.uploadService.editImage(false);
  }

  addBrand(): void {
    if (!this.btnDis()) {
      const logo = this.uploadService.getImage();
      const newB = new Trademarks(this.id, this.name, this.country, logo);
      if (!this.editStatus) {
        delete newB.id;
        this.trademarkService.postTrademark({ ...newB });
      } else {
        newB.id = this.tId;
        this.trademarkService.updateTrademark({ ...newB });
        this.scrollService.scrollToElement(this.id);
        this.editStatus = false;
      }
      this.resetForm()
    }
  }

  deleteBrand(): void {
    this.uploadService.deleteImage(this.tPath);
    this.trademarkService.deleteTrademark(this.tId);
    this.modalRef.hide();
    this.tPath = "";
  }

  editBrand(brand: ITrademarks): void {
    this.tId = brand.id
    this.name = brand.name;
    this.country = brand.country;
    this.editStatus = true;
    this.uploadService.editImage(true, brand.logo);
    this.scrollService.scrollUp();
  }

}
