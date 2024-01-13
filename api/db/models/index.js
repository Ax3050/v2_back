const { User, UserSchema } = require('./user.model');
const {People, PeopleSchema} = require('./people.model')
const {Investigator, InvestigatorSchema} = require('./investigator.model')
const {Estado, StateSchema} = require('./estado.model')
const {Municipio, MunicipioSchema} = require('./municipio.model')
const {Parroquia, ParroquiaSchema} = require('./parroquia.model')
const {Pnf, PnfSchema} = require('./pnf.model')
const {Trayecto, TrayectoSchema} = require('./trayecto.model')
const {Seccion, SeccionSchema} = require('./seccion.model')
const {Teacher, TeacherSchema} = require('./teacher.model')
const {AreaPrioritaria, AreaPrioritariaSchema} = require('./area-prioritaria')
const {LineaInvestigacion, LineaInvestigacionSchema} = require('./linea-investigacion.model')
const {DimensionEspacial, DimensionEspacialSchema} = require('./dimension-espacial.model')
const {SujetoSocial, SujetoSocialSchema} = require('./sujeto-social.model')
const {AcademicYear, AcademicYearSchema} = require('./academic-year.model');
const { Project, ProjectSchema } = require('./project.model');
const { ProjectStudent, ProjectStudentSchema } = require('./project-student.model');

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize))
  People.init(PeopleSchema, People.config(sequelize))
  AcademicYear.init(AcademicYearSchema, AcademicYear.config(sequelize))

  Investigator.init(InvestigatorSchema, Investigator.config(sequelize))
  Estado.init(StateSchema, Estado.config(sequelize))
  Municipio.init(MunicipioSchema, Municipio.config(sequelize))
  Parroquia.init(ParroquiaSchema, Parroquia.config(sequelize))
  Pnf.init(PnfSchema, Pnf.config(sequelize))
  Trayecto.init(TrayectoSchema, Trayecto.config(sequelize))
  Seccion.init(SeccionSchema, Seccion.config(sequelize))
  Teacher.init(TeacherSchema, Teacher.config(sequelize))
  AreaPrioritaria.init(AreaPrioritariaSchema, AreaPrioritaria.config(sequelize))
  LineaInvestigacion.init(LineaInvestigacionSchema, LineaInvestigacion.config(sequelize))
  DimensionEspacial.init(DimensionEspacialSchema, DimensionEspacial.config(sequelize))
  SujetoSocial.init(SujetoSocialSchema, SujetoSocial.config(sequelize))
  Project.init(ProjectSchema, Project.config(sequelize))
  ProjectStudent.init(ProjectStudentSchema, ProjectStudent.config(sequelize))

  User.associate(sequelize.models);
  Investigator.associate(sequelize.models);
  People.associate(sequelize.models);
  Seccion.associate(sequelize.models);
  Pnf.associate(sequelize.models);
  Municipio.associate(sequelize.models);
  Parroquia.associate(sequelize.models);
  Teacher.associate(sequelize.models);
  DimensionEspacial.associate(sequelize.models);
  AreaPrioritaria.associate(sequelize.models);
  SujetoSocial.associate(sequelize.models);
  LineaInvestigacion.associate(sequelize.models);
  Project.associate(sequelize.models);
  ProjectStudent.associate(sequelize.models);
}


module.exports = setupModels;
