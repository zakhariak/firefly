import { Component, OnInit } from '@angular/core';
import { ITrademarks } from '../../shared/interfaces/trademarks.interface';
import { TrademarkService } from '../../shared/services/trademark.service';

@Component({
  selector: 'app-trademarks',
  templateUrl: './trademarks.component.html',
  styleUrls: ['./trademarks.component.scss']
})
export class TrademarksComponent implements OnInit {
  arrBrands: Array<ITrademarks> = [];
  constructor(private brandservice: TrademarkService) { }

  ngOnInit(): void {
    this.getbrands();
  }

  getbrands(): void {
    this.brandservice.getTrademarks().subscribe(collection => {
      collection.map(doc => {
        const data = doc.payload.doc.data() as ITrademarks;
        data.id = doc.payload.doc.id;
        this.arrBrands.push({ ...data })
      })
    })
  }

}
