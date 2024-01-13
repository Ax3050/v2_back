const {models} = require('../libs/sequelize');



class ImportService {

  async create(data){
    try {
      console.log('data ', data)
      const res = [];

      await data.forEach(async (element) => {

        const user = await models.People.findOne({
          where:{cedula: element.people.cedula}
        })
        let dataUser=null;

        user?.dataValues ?
          (dataUser = await user.update(element.people)) :
          (dataUser = await models.People.create(element.people))

        console.log('user ', dataUser?.dataValues.id)

        const investigator = await models.Investigator.findOne({
          where:{people_id: dataUser?.dataValues.id}
        })

        let dataInvest = null;
        delete element.people;
        investigator?.dataValues ?
          (dataInvest = await investigator.update(element)) :
          (dataInvest = await models.Investigator.create({...element, peopleId: dataUser?.dataValues.id}))
      });

      // const res = await models.Investigator.bulkCreate(data,{
      //   ignoreDuplicates:true,
      //   include:['people'],

      // })
      return res;
    } catch (error) {
      return error
      
    }

  }


}

module.exports = ImportService;
