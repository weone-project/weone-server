const { Invitations, Musics, Order, User } = require('../models/index')

class InvitationController {
  static async getAllInvitation(req, res, next) {
    try {
      let dataInvitations = await Invitations.findAll()
      res.status(200).json(dataInvitations)
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getInvitationById(req, res, next) {
    try {
      const { id } = req.params
      let findInvitation = await Invitations.findOne({
        where: { id },
        include:
          [
            {
              model: Musics
            },
            {
              model: Order,
              include: {
                model: User,
                attributes: {
                  exclude: ['password']
                }
              }
            }
          ]
      })

      if (!findInvitation) {
        throw { name: "notFound" }
      }

      res.status(200).json(findInvitation)
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = InvitationController