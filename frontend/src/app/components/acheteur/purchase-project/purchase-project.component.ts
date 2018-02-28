import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AcheteurClass } from 'app/models/AcheteurClass';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { AcheteurService } from 'app/services/acheteur.service';
import { AuthenticationService } from 'app/services/authentication.service';

@Component({
  selector: 'app-purchase-project',
  templateUrl: './purchase-project.component.html',
  styleUrls: ['./purchase-project.component.css']
})
export class PurchaseProjectComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private acheteurService: AcheteurService,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private authService: AuthenticationService) { }
  
  form: FormGroup;
  acheteur: AcheteurClass;

  ngOnInit() {
    this.acheteur = this.route.snapshot.data['acheteur'];

    this.form = this.fb.group({
      project: [this.acheteur.project, Validators.required]
    });
  }

  onSubmit() {
    const formModel = this.form.value;

    if (!this.form.invalid) {
      const acheteur = new AcheteurClass({
        project: formModel.project
      });

      this.acheteurService.patchAcheteur(acheteur, this.authService.userId).subscribe(res => {
        this.notificationsService.success('Merci !', 'Vos informations ont été sauvegardées avec succès.');
      }, err => {
        this.notificationsService.error('Désolé...', 'Une erreur a eu lieu lors de l\'enregistrement de vos informations.');
      });
    }
    else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });

      this.notificationsService.error('Oups !', 'Les données saisies sont erronées ou incomplètes.');
    }
  }
}
