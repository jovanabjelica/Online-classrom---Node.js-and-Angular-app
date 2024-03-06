import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {
  
  username: string = "";
  file: File | null = null;

  error: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private service: RegisterService) {}

  ngOnInit(): void {
    this.error = "";

    this.route.params.subscribe(
      (data)=>{
        if (!data) return;

        const params = data as any;
        this.username = params.username;
      }
    )
  }

  onFileChange(event: any): void {
    this.file = event.target.files[0];
  }

  accept(): void {
    if (!this.file) {
      this.error = "Morate priloziti fajl!";
      return;
    } 
    
    const maxSizeInBytes = 3 * 1024 * 1024; // 3 MB
    if (this.file.size > maxSizeInBytes) {
      this.error = "Fajl je prevelik. Maksimalna veličina je 3MB.";
      return;
    }

    this.service.uploadCV(this.username, this.file).subscribe(
      (data)=>{
        if (!data) {
          alert("Greska! Pokusajte ponovo za nekoliko trenutaka!");
          return;
        }
        const params = {
          username: this.username,
          type: 'p'
        };
        
        this.router.navigate(['/profilePicture', params])
      }
    );
  }
}
