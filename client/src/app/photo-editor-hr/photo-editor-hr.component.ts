import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from 'src/app/_models/member';

import { User } from 'src/app/_models/user';
import { AccountService } from '../_services/account.service';
import { SearchMembersService } from '../_services/search-members.service';
import { Photo } from '../_models/photo';
import { PhotoHr } from 'src/app/_models/photoHr';

@Component({
  selector: 'app-photo-editor-hr',
  templateUrl: './photo-editor-hr.component.html',
  styleUrls: ['./photo-editor-hr.component.css'],
})
export class PhotoEditorHrComponent implements OnInit {
  @Input() member: Member;
  user: User;
  photoHrs: PhotoHr[];
  photos: Photo[];
  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;

  constructor(
    private accountService: AccountService,
    private searchMemberService: SearchMembersService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    console.log('inside ngoninit in photo hr');
    this.initializeUploader();
  }

  setMainHrPhoto(photoHr: PhotoHr) {
    this.searchMemberService.setMainHrPhoto(photoHr.id).subscribe(() => {
      this.user.hrUrl = photoHr.hrUrl;
      this.accountService.setCurrentUser(this.user);
      this.member.hrUrl = photoHr.hrUrl;
      this.member.photoHrs.forEach((p) => {
        if (p.isMainHr) {
          p.isMainHr = false;
        }
        if (p.id === photoHr.id) {
          p.isMainHr = true;
        }
      });
    });
  }

  deleteHrPhoto(photoId: number) {
    this.searchMemberService.deleteHrPhoto(photoId).subscribe(() => {
      this.member.photoHrs = this.member.photoHrs.filter(
        (x) => x.id !== photoId
      );
    });
  }

  fileOverBase(event: any) {
    this.hasBaseDropzoneOver = event;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'searchusers/add-hr-photo',
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });
    console.log('just initialized hr fileuploader');

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    console.log('just aftrer onafteraddingfile');
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photoHr: PhotoHr = JSON.parse(response);
        this.member.photoHrs.push(photoHr);
        if (photoHr.isMainHr) {
          this.user.hrUrl = photoHr.hrUrl;
          this.member.hrUrl = photoHr.hrUrl;
          this.accountService.setCurrentUser(this.user);
        }
        // if (photo.isMainLogo) {
        //   this.user.logoUrl = photo.logoUrl;
        //   this.member.logoUrl = photo.logoUrl;
        //   this.accountService.setCurrentUser(this.user);
        // }
      }
    };
  }
}
