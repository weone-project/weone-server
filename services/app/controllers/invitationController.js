const { Invitations, Musics, Order, User } = require('../models/index')

class InvitationController {
  static async getAllInvitation(req, res, next) {
    try {
      let dataInvitations = await Invitations.findAll()
      res.status(200).json(dataInvitations)
    } catch (error) {
      // console.log(error);
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
      // console.log(error, '<<<<<<');
      next(error);
    }
  }

  static async createInvitation(req, res, next) {
    try {
      const { quote, quote_src, bride, bride_img, bride_nick, bride_mother, bride_father, groom, groom_img, groom_nick, groom_mother, groom_father, matrimony_name, matrimony_date, matrimony_time_start, matrimony_time_end, ceremonial_name, ceremonial_date, ceremonial_time_start, ceremonial_time_end, map_location, address_ceremonial, address_matrimony, photo, story, story_img, wallet_bank, wallet_no, wallet_owner, MusicId, OrderId } = req.body
      await Invitations.create({ quote, quote_src, bride, bride_img, bride_nick, bride_mother, bride_father, groom, groom_img, groom_nick, groom_mother, groom_father, matrimony_name, matrimony_date, matrimony_time_start, matrimony_time_end, ceremonial_name, ceremonial_date, ceremonial_time_start, ceremonial_time_end, map_location, address_ceremonial, address_matrimony, photo, story, story_img, wallet_bank, wallet_no, wallet_owner, MusicId, OrderId })
      res.status(201).json({ message: `Success create invitation of ${bride_nick} and ${groom_nick}` })
    } catch (error) {
      console.log(error, '<---- error createInvitation Controller');
      next(error);
    }
  }

  static async editInvitation(req, res, next) {
    try {
      const { id } = req.params
      let invitationData = await Invitations.findByPk(id)

      if (!invitationData) {
        throw { name: 'Data not found' }
      }

      const { quote, quote_src, bride, bride_img, bride_nick, bride_mother, bride_father, groom, groom_img, groom_nick, groom_mother, groom_father, matrimony_name, matrimony_date, matrimony_time_start, matrimony_time_end, ceremonial_name, ceremonial_date, ceremonial_time_start, ceremonial_time_end, map_location, address_ceremonial, address_matrimony, photo, story, story_img, wallet_bank, wallet_no, wallet_owner, MusicId, OrderId } = req.body

      await Invitations.update({ quote, quote_src, bride, bride_img, bride_nick, bride_mother, bride_father, groom, groom_img, groom_nick, groom_mother, groom_father, matrimony_name, matrimony_date, matrimony_time_start, matrimony_time_end, ceremonial_name, ceremonial_date, ceremonial_time_start, ceremonial_time_end, map_location, address_ceremonial, address_matrimony, photo, story, story_img, wallet_bank, wallet_no, wallet_owner, MusicId, OrderId }, {
        where: {
          id: id
        }
      })
      res.status(200).json({ message: `Invitation of ${bride_nick} and ${groom_nick} has been updated` })
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
}

module.exports = InvitationController