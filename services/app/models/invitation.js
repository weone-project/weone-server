'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invitations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invitations.belongsTo(models.Order)
      Invitations.belongsTo(models.Musics)
      Invitations.hasMany(models.Greets)
      Invitations.hasMany(models.GuestBook)
    }
  }
  Invitations.init({
    quote: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Quote is required"
        },
        notEmpty: {
          msg: "Quote is required"
        }
      }
    },
    quote_src: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Quote source is required"
        },
        notEmpty: {
          msg: "Quote source is required"
        }
      }
    },
    bride: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Full Name is required"
        },
        notEmpty: {
          msg: "Full Name is required"
        }
      }
    },
    bride_img: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Bride Image is required"
        },
        notEmpty: {
          msg: "Bride Image is required"
        }
      }
    },
    bride_nick: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Bride Nickname is required"
        },
        notEmpty: {
          msg: "Bride Nickname is required"
        }
      }
    },
    bride_mother: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Bride's mom is required"
        },
        notEmpty: {
          msg: "Bride's mom is required"
        }
      }
    },
    bride_father: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Bride's father is required"
        },
        notEmpty: {
          msg: "Bride's father is required"
        }
      }
    },
    groom: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Groom name is required"
        },
        notEmpty: {
          msg: "Groom name is required"
        }
      }
    },
    groom_img: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Groom image is required"
        },
        notEmpty: {
          msg: "Groom image is required"
        }
      }
    },
    groom_nick: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Groom nickname is required"
        },
        notEmpty: {
          msg: "Groom nickname is required"
        }
      }
    },
    groom_mother: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Groom's mom is required"
        },
        notEmpty: {
          msg: "Groom's mom is required"
        }
      }
    },
    groom_father: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Groom's father is required"
        },
        notEmpty: {
          msg: "Groom's father is required"
        }
      }
    },
    matrimony_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Matrimony name is required"
        },
        notEmpty: {
          msg: "Matrimony name is required"
        }
      }
    },
    matrimony_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Matrimony date is required"
        },
        notEmpty: {
          msg: "Matrimony date is required"
        }
      }
    },
    matrimony_time_start: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Matrimony time start is required"
        },
        notEmpty: {
          msg: "Matrimony time start is required"
        }
      }
    },
    matrimony_time_end: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Matrimony time end is required"
        },
        notEmpty: {
          msg: "Matrimony time end is required"
        }
      }
    },
    ceremonial_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Ceremonial name is required"
        },
        notEmpty: {
          msg: "Ceremonial name is required"
        }
      }
    },
    ceremonial_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Ceremonial date is required"
        },
        notEmpty: {
          msg: "Ceremonial date is required"
        }
      }
    },
    ceremonial_time_start: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Ceremonial time start is required"
        },
        notEmpty: {
          msg: "Ceremonial time start is required"
        }
      }
    },
    ceremonial_time_end: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Ceremonial time end is required"
        },
        notEmpty: {
          msg: "Ceremonial time end is required"
        }
      }
    },
    map_location: DataTypes.TEXT,
    address_ceremonial: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Map location is required"
        },
        notEmpty: {
          msg: "Map location is required"
        }
      }
    },
    address_matrimony: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Matrimony address is required"
        },
        notEmpty: {
          msg: "Matrimony address is required"
        }
      }
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Photo is required"
        },
        notEmpty: {
          msg: "Photo is required"
        }
      }
    },
    story: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Story is required"
        },
        notEmpty: {
          msg: "Story is required"
        }
      }
    },
    story_img: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Story image is required"
        },
        notEmpty: {
          msg: "Story image is required"
        }
      }
    },
    wallet_bank: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Bank wallet is required"
        },
        notEmpty: {
          msg: "Bank wallet is required"
        }
      }
    },
    wallet_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Wallet number is required"
        },
        notEmpty: {
          msg: "Wallet number is required"
        }
      }
    },
    wallet_owner: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Wallet owner is required"
        },
        notEmpty: {
          msg: "Wallet owner is required"
        }
      }
    },
    MusicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Music is required"
        },
        notEmpty: {
          msg: "Music is required"
        }
      }
    },
    OrderId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Invitations',
  });
  return Invitations;
};