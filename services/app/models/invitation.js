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
          msg: "Quote Mohon diisi"
        },
        notEmpty: {
          msg: "Quote Mohon diisi"
        }
      }
    },
    quote_src: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Sumber Quote Mohon diisi"
        },
        notEmpty: {
          msg: "Sumber Quote Mohon diisi"
        }
      }
    },
    bride: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Nama Lengkap Mohon diisi"
        },
        notEmpty: {
          msg: "Nama Lengkap Mohon diisi"
        }
      }
    },
    bride_img: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Foto Mohon diupload"
        },
        notEmpty: {
          msg: "Foto Mohon diupload"
        }
      }
    },
    bride_nick: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Nama Panggilan Mohon diisi"
        },
        notEmpty: {
          msg: "Nama Panggilan Mohon diisi"
        }
      }
    },
    bride_mother: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Nama Ibu Mohon diisi"
        },
        notEmpty: {
          msg: "Nama Ibu Mohon diisi"
        }
      }
    },
    bride_father: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Nama Ayah Mohon diisi"
        },
        notEmpty: {
          msg: "Nama Ayah Mohon diisi"
        }
      }
    },
    groom: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Nama Lengkap Mohon diisi"
        },
        notEmpty: {
          msg: "Nama Lengkap Mohon diisi"
        }
      }
    },
    groom_img: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Foto Mohon diupload"
        },
        notEmpty: {
          msg: "Foto Mohon diupload"
        }
      }
    },
    groom_nick: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Nama Panggilan Mohon diisi"
        },
        notEmpty: {
          msg: "Nama Panggilan Mohon diisi"
        }
      }
    },
    groom_mother: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Nama Ibu Mohon diisi"
        },
        notEmpty: {
          msg: "Nama Ibu Mohon diisi"
        }
      }
    },
    groom_father: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Nama Ayah Mohon diisi"
        },
        notEmpty: {
          msg: "Nama Ayah Mohon diisi"
        }
      }
    },
    matrimony_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Nama Acara Akad/Pemberkatan Mohon diisi"
        },
        notEmpty: {
          msg: "Nama Acara Akad/Pemberkatan Mohon diisi"
        }
      }
    },
    matrimony_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Tanggal Acara Mohon diisi"
        },
        notEmpty: {
          msg: "Tanggal Acara Mohon diisi"
        }
      }
    },
    matrimony_time_start: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "jam Mulai Mohon diisi"
        },
        notEmpty: {
          msg: "Jam Mulai Mohon diisi"
        }
      }
    },
    matrimony_time_end: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Jam Selesai Mohon diisi"
        },
        notEmpty: {
          msg: "Jam Selesai Mohon diisi"
        }
      }
    },
    ceremonial_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Nama Acara Resepsi Mohon diisi"
        },
        notEmpty: {
          msg: "Nama Acara Resepsi Mohon diisi"
        }
      }
    },
    ceremonial_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Tanggal Acara Mohon diisi"
        },
        notEmpty: {
          msg: "Tanggal Acara Mohon diisi"
        }
      }
    },
    ceremonial_time_start: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "jam Mulai Mohon diisi"
        },
        notEmpty: {
          msg: "Jam Mulai Mohon diisi"
        }
      }
    },
    ceremonial_time_end: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Jam Selesai Mohon diisi"
        },
        notEmpty: {
          msg: "Jam Selesai Mohon diisi"
        }
      }
    },
    map_location: DataTypes.TEXT,
    address_ceremonial: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Alamat Akad Mohon diisi"
        },
        notEmpty: {
          msg: "Alamat Akad Mohon diisi"
        }
      }
    },
    address_matrimony: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Alamat Resepsi Mohon diisi"
        },
        notEmpty: {
          msg: "Alamat Resepsi Mohon diisi"
        }
      }
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Foto Mohon diupload"
        },
        notEmpty: {
          msg: "Foto Mohon diupload"
        }
      }
    },
    story: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Story Mohon diisi"
        },
        notEmpty: {
          msg: "Story Mohon diisi"
        }
      }
    },
    story_img: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Foto Mohon diupload"
        },
        notEmpty: {
          msg: "Foto Mohon diupload"
        }
      }
    },
    wallet_bank: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Nama Bank Mohon diisi"
        },
        notEmpty: {
          msg: "Nama Bank Mohon diisi"
        }
      }
    },
    wallet_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Nomor Rekening Mohon diisi"
        },
        notEmpty: {
          msg: "Nomor Rekening Mohon diisi"
        }
      }
    },
    wallet_owner: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Nama Pemilik Rekening Mohon diisi"
        },
        notEmpty: {
          msg: "Nama Pemilik Rekening Mohon diisi"
        }
      }
    },
    MusicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Mohon Pilih Lagu Terlebih Dahulu"
        },
        notEmpty: {
          msg: "Mohon Pilih Lagu Terlebih Dahulu"
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