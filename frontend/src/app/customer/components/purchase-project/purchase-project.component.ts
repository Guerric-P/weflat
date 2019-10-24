import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerClass } from '@weflat/core/models/CustomerClass';
import { AuthenticationService } from '@weflat/core/services/authentication.service';
import { AcheteurService } from '@weflat/shared/services/acheteur.service';
import { NotificationsService } from 'angular9-notifications';

@Component({
  selector: 'app-purchase-project',
  templateUrl: './purchase-project.component.html',
  styleUrls: ['./purchase-project.component.scss']
})
export class PurchaseProjectComponent implements OnInit {

  form: FormGroup;
  acheteur: CustomerClass;

  constructor(private fb: FormBuilder,
    private acheteurService: AcheteurService,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.acheteur = this.route.snapshot.data['acheteur'];

    this.form = this.fb.group({
      project: [this.acheteur.project, Validators.required]
    });
  }

  onSubmit() {
    const formModel = this.form.value;

    if (!this.form.invalid) {
      const acheteur = new CustomerClass({
        project: formModel.project
      });

      this.acheteurService.patchAcheteur(acheteur, this.authService.userId).subscribe(res => {
        this.notificationsService.success('Merci !', 'Vos informations ont été sauvegardées avec succès.');
      }, err => {
        this.notificationsService.error('Désolé...', 'Une erreur a eu lieu lors de l\'enregistrement de vos informations.');
      });
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });

      this.notificationsService.error('Oups !', 'Les données saisies sont erronées ou incomplètes.');
    }
  }
}
