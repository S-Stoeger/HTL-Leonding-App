import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RentalEquipment } from './rental-equipment';
import {BehaviorSubject, Observable} from 'rxjs';
import {NavigationComponent} from './navigation/navigation.component';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private jsonFileUrl = 'assets/rental-equipments.json';
  equipments: RentalEquipment[] = [];
  private numberSource = new BehaviorSubject<number>(0);
  private equipmentSource = new BehaviorSubject<RentalEquipment[]>([]);
  badgeCount: Observable<number> = this.numberSource.asObservable();
  warenkorb: Observable<RentalEquipment[]> = this.equipmentSource.asObservable();

  constructor(private http: HttpClient) {}

  loadEquipments(): Observable<RentalEquipment[]> {
    return this.http.get<RentalEquipment[]>(this.jsonFileUrl);
  }

  addEquipment(equipment: RentalEquipment) {
    if (equipment) {
      this.equipments.push(equipment);
      this.saveToLocalStorage();
    }

    this.getStorageItemCount()
    this.loadFromLocalStorage()
  }

  updateEquipment(equipment: RentalEquipment) {
    const index = this.equipments.findIndex((e) => e.id === equipment.id);
    if (index !== -1) {
      this.equipments[index] = equipment;
      this.saveToLocalStorage();
      this.getStorageItemCount()
      this.loadFromLocalStorage()
    } else {
      console.error('Equipment not found!');
    }
  }

  deleteEquipment(id: number) {
    this.equipments = this.equipments.filter((e) => e.id !== id);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('rentalEquipments', JSON.stringify(this.equipments));
  }

  loadFromLocalStorage() {
    const data = localStorage.getItem('rentalEquipments');
    if (data) {
      this.equipments = JSON.parse(data);
      this.equipmentSource.next(this.equipments);
    } else {
      this.equipmentSource.next(this.equipments);
    }
  }

  deleteFromLocalStorage(id: number) {
    let array = JSON.parse(<string>localStorage.getItem('rentalEquipments'));

    if (array) {
      const index = array.findIndex((item: RentalEquipment) => item.equipmentID === id);

      if (index !== -1) {
        array.splice(index, 1);
        localStorage.setItem('rentalEquipments', JSON.stringify(array));
      } else {
        localStorage.removeItem('rentalEquipments');
      }
    }
    this.getStorageItemCount()
    this.loadFromLocalStorage()
  }

  getStorageItemCount() {
    const array = JSON.parse(<string>localStorage.getItem('rentalEquipments'));
    this.numberSource.next(array ? array.length : 0);
    //return array ? array.length : 0;
  }

  clearStorage() {
    localStorage.removeItem('rentalEquipments');
    this.equipments = [];
    this.getStorageItemCount()
    this.loadFromLocalStorage()
    console.log(this.equipments);
    const data = localStorage.getItem('rentalEquipments');
    console.log(data)
  }
}
