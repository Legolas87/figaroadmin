import PartnerModel from '../../models/PartnerModel';

// @flow

class Middleware {
  static parsePartners = (partnersFromServer:any): Array<PartnerModel> => partnersFromServer.map((partnerFromServer) => {
    const partner: PartnerModel = new PartnerModel();

    partner.name = partnerFromServer.name;

    return partner;
  })
}

export default Middleware;
