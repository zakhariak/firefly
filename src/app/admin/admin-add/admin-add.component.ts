import { Component, OnInit } from '@angular/core';
import { CharacteristicsService } from '../../shared/services/characteristics.service';
import { IProdCharacter } from '../../shared/interfaces/product-characteristics.interface';
import { ProdCharacter } from '../../shared/models/product-characteristics.model';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.scss']
})
export class AdminAddComponent implements OnInit {
  arrCharactr: Array<IProdCharacter> = [];
  selectArr: Array<string> = [];
  characteristicNameUA: string;
  characteristicNameEN: string;
  characterName: string = "Виберіть характеристику";
  selectName: string;
  search: string;

  constructor(private characterService: CharacteristicsService) { }

  ngOnInit(): void {
    this.getCharacter();
  }

  resetForm(): void {
    this.selectArr = [];
    this.characteristicNameUA = "";
    this.characteristicNameEN = "";
    this.selectName = "";
    this.characterName = "Виберіть характеристику";
    this.selectName = "";
  }

  private getCharacter(): void {
    this.characterService.getAllCharacteristics().subscribe(
      collection => {
        this.arrCharactr = collection.map(character => {
          const data = character.payload.doc.data() as IProdCharacter;
          data.id = character.payload.doc.id;
          return data;
        })
      }
    )
  }

  addCharacter() {
    if (this.characteristicNameUA && this.characteristicNameEN) {
      const newCh = new ProdCharacter('1', this.characteristicNameUA.toLowerCase(), this.characteristicNameEN.toLowerCase(), this.selectArr)
      delete newCh.id;
      this.characterService.addCharacteristic({ ...newCh })
      this.resetForm();
    }
  }

  addCharacteristicValue(): void {
    const char = this.arrCharactr.filter(char => char.nameUA === this.characterName.toLowerCase())[0];
    char.select.push(this.selectName);
    this.characterService.updateCharacteristic(char);
    this.resetForm();
  }

  deleteChar(char: IProdCharacter): void {
    if (confirm('Ви дійсно бажаєте видалити?')) {
      this.characterService.deleteCharacteristic(char.id);
    }
  }

  deleteSelect(char: IProdCharacter, i: number): void {
    if (confirm('Ви дійсно бажаєте видалити?')) {
      char.select.splice(i, 1);
      this.characterService.updateCharacteristic(char);
    }
  }

  disBtnCreate(): boolean {
    if (this.characteristicNameUA && this.characteristicNameEN) {
      return true
    } else {
      return false
    }
  }

  disBtnAdd(): boolean {
    if (this.characterName !== "Виберіть характеристику" && this.selectName) {
      return true
    } else {
      return false
    }
  }
}
