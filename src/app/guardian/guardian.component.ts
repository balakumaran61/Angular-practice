// src/app/components/guardian/guardian.component.ts
import { Component, OnInit } from '@angular/core';
import { GuardianService } from '../services/guardian.service';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-guardian',
  templateUrl: './guardian.component.html',
  styleUrls: ['./guardian.component.css'],
})
export class GuardianComponent implements OnInit {
  guardians: any[] = [];
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  sortBy: string = 'name';
  sortType: string = 'asc'; 
  searchText: string = '';

  constructor(private guardianService: GuardianService) {}

  ngOnInit(): void {
    this.loadGuardians();
  }

  loadGuardians() {
    this.guardianService
      .getGuardians(this.currentPage, this.pageSize, this.sortBy, this.sortType, this.searchText)
      .subscribe((data) => {
        this.guardians = data.content;
        this.totalPages = data.totalPages;
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadGuardians();
  }

  sort(column: string, type: string) {
    this.sortBy = column;
    this.sortType = type;
    this.loadGuardians();
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }   
  onSearchChange() {
    this.loadGuardians();
  }
}
