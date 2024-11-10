import { Component } from '@angular/core';
import { CreateExplore } from '../../data/CreateExplore';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { key } from '../../data/encryptionKey';
import { ArtifactsService } from '../../services/artifacts.service';

@Component({
  selector: 'app-explore-components',
  templateUrl: './explore-components.component.html',
  styleUrl: './explore-components.component.css'
})
export class ExploreComponentsComponent {
  currentItem: CreateExplore = new CreateExplore();
  artifacts: CreateExplore[] = [];

  constructor(
    private router: Router,
    private getArtifacts: ArtifactsService
  ) {
  }

  ngOnInit() {
    this.artifacts = this.getArtifacts.getAll();
  }

  trackByFn(item: any) {
    return item.id;
  }

  toggleLike(item: CreateExplore) {
    const index = this.artifacts.indexOf(item);
    if (index !== -1) {
      this.artifacts[index].bookmark = !this.artifacts[index].bookmark;
    }
  }

  readMore(item: any) {
    this.currentItem = item;
    if (this.currentItem.id >= 0) {
      let encrypted = CryptoJS.AES.encrypt(JSON.stringify(this.currentItem.id), key).toString();
      let encodeId = encodeURIComponent(encrypted);
      this.router.navigate(['/explore', encodeId]);
    }
  }

  getId(item: any) {
    return item.id;
  }
}

