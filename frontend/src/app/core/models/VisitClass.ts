import { ArchitectClass } from '@weflat/core/models/ArchitectClass';
import { CustomerClass } from '@weflat/core/models/CustomerClass';
import { ZipCodeClass } from '@weflat/core/models/ZipCodeClass';
import { VisitStatusEnum } from '@weflat/shared/common/enums/VisitStatusEnum';

export class VisitClass {
    public id: number;
    public customer: CustomerClass;
    public architect: ArchitectClass;
    public architectId: number;
    public zipCode: ZipCodeClass;
    public city: string;
    public route: string;
    public streetNumber: string;
    public visiteDate: Date;
    public creationDate: Date;
    public status: number;
    public announcementUrl: string;
    public chargeId: string;

    get formattedAddress() {
        try {
            return (this.streetNumber ? this.streetNumber + ', ' : '')
                + this.route
                + ' - '
                + this.zipCode.number
                + ' '
                + this.city;
        } catch (err) {
            // Ignore
        }
    }

    get isComplete(): boolean {
        return !!this.city && !!this.route && !!this.customer && !!this.zipCode && !!this.visiteDate;
    }

    get statusText() {
        switch (this.status) {
            case VisitStatusEnum.BEING_ASSIGNED:
                return 'En cours d\'attribution';
            case VisitStatusEnum.CANCELED:
                return 'Annulée';
            case VisitStatusEnum.IN_PROGRESS:
                return 'En cours';
            case VisitStatusEnum.REFUNDED:
                return 'Remboursée';
            case VisitStatusEnum.REPORT_AVAILABLE:
                return 'Rapport disponible';
            case VisitStatusEnum.REPORT_BEING_WRITTEN:
                return 'Rapport en cours de rédaction';
            case VisitStatusEnum.UNASSIGNED:
                return 'Non assignée';
            case VisitStatusEnum.WAITING_FOR_PAYMENT:
                return 'En attente de paiement';
            case VisitStatusEnum.ARCHITECT_PAID:
                return 'Architecte payé';
        }
    }

    constructor(obj?: any) {
        for (const key in obj) {
            if (key === 'visiteDate' || key === 'creationDate') {
                this[key] = new Date(obj[key]);
            } else {
                this[key] = obj[key];
            }
        }
    }
}
