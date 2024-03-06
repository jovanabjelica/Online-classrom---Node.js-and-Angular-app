import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private service: RegisterService) {}

  username: string = "";
  type: string = "";
  file: File|null = null;
  t: string = '';

  onFileChange(event: any): void {
    this.file = event.target.files[0];
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (data)=>{
        if (!data) return;

        let params = data as any;
        
        this.username = params.username;
        this.type = params.type;
        this.t = params.t;
      }
    )
  }

  finish(): void {
    if (this.t == 't') {
      const data = {
        username: this.username
      };

      this.router.navigate(['/teacher', data]);
      return;
    }
    if (this.type == 'p') {
      alert("Vas zahtev za registracijom je prosledjen! Nakon sto ga admin odobri, moci cete da pristupite svom nalogu!");
      this.router.navigate(['/']);
      return;
    } else {
      const data = {
        username: this.username
      };
      this.router.navigate(['/student', data]);
    }
  }

  potvrda() {
    if (this.file) {
      const maxSizeInPixels = 800;
      const minSizeInPixels = 100;

      const img = new Image();
  
      const reader = new FileReader();
      reader.onload = (e: any) => {
          img.src = e.target.result;
  
          img.onload = () => {
              const width = img.width;
              const height = img.height;
  
              if (width > maxSizeInPixels || height > maxSizeInPixels) {
                  alert('Dimenzije slike su prevelike. Molimo izaberite sliku manjih dimenzija.');
                  this.file = null; 
                  return;
              }
  
              if (width < minSizeInPixels || height < minSizeInPixels) {
                alert('Dimenzije slike su premale. Molimo izaberite sliku vecih dimenzija.');
                this.file = null; 
                return;
              }

              if (!this.file) return;
              this.service.uploadPicture(this.username, this.file).subscribe(
                  (data) => {
                      if (!data) return;
                      this.finish();
                      return;
                  }
              );
          };
      };
  
      reader.readAsDataURL(this.file);
  } else {
      this.finish();
  }
  
  }
}
