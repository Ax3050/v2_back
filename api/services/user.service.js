const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom')
const nodemailer = require('nodemailer');
class UserService {

  constructor() {
  }

  async get() {
    // const [data] = await sequelize.query('select * from users')
    const data = await models.User.findAll({
      include: ['people']
    })
    return data
  }

  async sendEmail(data) {

    const res = await models.User.findOne(
      {
        where: {
          email: data.email
        }
      }
    )

    if (res) {

      const fechaStr = new Date().toISOString().slice(4, 10).replace(/-/g, '');

      // Convertir el correo a minúsculas y eliminar los caracteres no alfanuméricos
      const correoSinCaracteresEspeciales = data.email.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 3);

      // Generar un número aleatorio de 5 dígitos
      const codigoRandom = Math.floor(Math.random() * 90000) + 10000;

      // Concatenar las variables para generar el código final
      const codigoFinal = fechaStr +  correoSinCaracteresEspeciales + codigoRandom;

      await res.update({recovery_code:codigoFinal})

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'sistemaccidsp@gmail.com',
          pass: 'rbllhjmmfudhhxph'
        }
      });

      transporter.verify().then((e) => {
        console.log('finoxs', e)
      })

      await transporter.sendMail({
        from: 'sistemaccidsp@gmail.com',
        to: data.email,
        subject: 'Recuperación de contraseña',
        text: `tu codigo es: ${codigoFinal}`
      })
    } else {
      throw new Error(`El correo no pertenece a ninguna cuenta registrada`)
    }

    console.log(res)


    // rbll hjmm fudh hxph

    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: 'sistemaccidsp@gmail.com',
    //     pass: 'ccidsp2023#'
    //   }
    // }).sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     return error.toString();
    //   }
    //   return info;
    // });

  }

  async verifyCode(data) {
    const res = await models.User.findOne(
      {
        where: {
          email: data.email
        }
      }
    )
    if(data.code === res.recovery_code){
      return 'asd';
    }else{
      throw new Error(`El código no es correcto`)
    }
  }

  async changePass(data) {

    const res = await models.User.findOne(
      {
        where: {
          email: data.email
        }
      }
    )
    const hash = await bcrypt.hash(data.password, 10);
    await res.update({password:hash})
    return true
  }

  async getOne(id) {
    const res = await this.pool.query(`select * from users where id=${id}`)
    return res.rows;
  }

  async findByEmail(email) {
    const res = await models.User.findOne({ where: { email } });
    return res;
  }

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);

    const res = await models.User.create(
      {
        ...data,
        password: hash
      },
      { include: ['people'] }
    )
    delete res.dataValues.password;
    return res;
  }

  async update(id, data) {
    const user = await models.User.findByPk(id)
    const res = await user.update(data)
    return res;
  }

  delete() {

  }

}


module.exports = UserService;
