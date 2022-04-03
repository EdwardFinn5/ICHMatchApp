import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { Photo } from '../_models/photo';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { SearchMembersService } from '../_services/search-members.service';

@Component({
  selector: 'app-photo-editor-logo',
  templateUrl: './photo-editor-logo.component.html',
  styleUrls: ['./photo-editor-logo.component.css'],
})
export class PhotoEditorLogoComponent implements OnInit {
  @Input() member: Member;
  user: User;
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
    this.initializeUploader();
  }

  // setMainStudentPhoto(photo: Photo) {
  //   this.searchMemberService.setMainPhoto(photo.id).subscribe(() => {
  //     this.user.studentUrl = photo.studentUrl;
  //     this.accountService.setCurrentUser(this.user);
  //     this.member.studentUrl = photo.studentUrl;
  //     this.member.photos.forEach((p) => {
  //       if (p.isMain) {
  //         p.isMain = false;
  //       }
  //       if (p.id === photo.id) {
  //         p.isMain = true;
  //       }
  //     });
  //   });
  // }

  setMainCompanyPhoto(photo: Photo) {
    this.searchMemberService.setMainPhoto(photo.id).subscribe(() => {
      this.user.logoUrl = photo.logoUrl;
      this.accountService.setCurrentUser(this.user);
      this.member.logoUrl = photo.logoUrl;
      this.member.photos.forEach((p) => {
        if (p.isMainLogo) {
          p.isMainLogo = false;
        }
        if (p.id === photo.id) {
          p.isMainLogo = true;
        }
      });
    });
  }

  // setMainHrPhoto(photo: Photo) {
  //   this.searchMemberService.setMainPhoto(photo.id).subscribe(() => {
  //     this.user.hrUrl = photo.hrUrl;
  //     this.accountService.setCurrentUser(this.user);
  //     this.member.hrUrl = photo.hrUrl;
  //     this.member.photos.forEach((p) => {
  //       if (p.isMainHr) {
  //         p.isMainHr = false;
  //       }
  //       if (p.id === photo.id) {
  //         p.isMainHr = true;
  //       }
  //     });
  //   });
  // }

  deletePhoto(photoId: number) {
    this.searchMemberService.deletePhoto(photoId).subscribe(() => {
      this.member.photos = this.member.photos.filter((x) => x.id !== photoId);
    });
  }

  fileOverBase(event: any) {
    this.hasBaseDropzoneOver = event;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'searchusers/add-photo',
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo: Photo = JSON.parse(response);
        this.member.photos.push(photo);
        if (photo.isMainHr) {
          this.user.hrUrl = photo.hrUrl;
          this.member.hrUrl = photo.hrUrl;
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
