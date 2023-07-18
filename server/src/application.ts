import { createApplication } from 'graphql-modules';
import { CandidateModule } from './modules/candidate-modules';
import { CompanyModule } from './modules/company-module';
import { JobModule } from './modules/job-modules';
const application = createApplication({
  modules: [CandidateModule, CompanyModule, JobModule],
});


export default application;
