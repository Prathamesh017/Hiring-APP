import { createApplication } from 'graphql-modules';
import { CandidateModule } from './modules/candidate-modules';
import { CompanyModule } from './modules/company-module';

const application = createApplication({
  modules: [CandidateModule, CompanyModule],
});


export default application;
