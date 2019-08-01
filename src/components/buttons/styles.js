import { fontFamily, fontFamilyMedium, fontWeights } from '../../util/font'
import { platformSelect } from '../../util'
import colors from '../../util/colors.json'

const buttonHeight = 40
const borderRadius = platformSelect(4, buttonHeight / 2)
const borderWidth = platformSelect(1, 2)
const buttonShadow = platformSelect({ elevation: 4 }, {})

const base = {
  view: {
    borderWidth,
    height: buttonHeight,
    borderRadius,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 16,
    ...platformSelect({
      fontFamily: fontFamilyMedium
    }, {
      fontWeight: fontWeights.medium
    }),
    ...buttonShadow
  },
  text: {
    color: colors.white,
    fontFamily,
    fontSize: 12,
    lineHeight: 22,
    textAlign: 'center',
    flexGrow: 1
  },
  image: {
    tintColor: colors.white
  }
}

const buttonHeightMini = 26
const borderRadiusMini = platformSelect(4, buttonHeightMini / 2)

const baseMini = {
  view: {
    height: buttonHeightMini,
    borderRadius: borderRadiusMini,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 4,
    paddingHorizontal: 8,
    ...platformSelect({
      fontFamily: fontFamilyMedium
    }, {
      fontWeight: fontWeights.medium
    })
  },
  text: {
    color: colors.white,
    fontFamily,
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'center',
    flexGrow: 1
  },
  image: {
    tintColor: colors.white
  }
}

export default {
  primary: {
    default: {
      view: {
        ...base.view,
        backgroundColor: colors.darkBlue,
        borderColor: colors.black
      },
      text: {
        ...base.text
      },
      image: {
        ...base.image
      }
    },
    pressed: {
      view: {
        ...base.view,
        backgroundColor: colors.darkBlue,
        borderColor: colors.black,
        marginTop: 14,
        marginBottom: 6,
        elevation: 0
      },
      text: {
        ...base.text
      },
      image: {
        ...base.image
      }
    }
  },
  primaryMini: {
    default: {
      view: {
        ...baseMini.view,
        backgroundColor: colors.darkBlue,
        borderColor: colors.black
      },
      text: {
        ...baseMini.text
      },
      image: {
        ...base.image
      }
    },
    pressed: {
      view: {
        ...baseMini.view,
        backgroundColor: colors.darkBlue,
        borderColor: colors.black
      },
      text: {
        ...baseMini.text
      },
      image: {
        ...base.image
      }
    }
  },
  secondary: {
    default: {
      view: {
        ...base.view,
        backgroundColor: colors.white,
        borderColor: colors.black
      },
      text: {
        ...base.text,
        color: colors.darkBlue
      },
      image: {
        ...base.image,
        tintColor: colors.darkBlue
      }
    },
    pressed: {
      view: {
        ...base.view,
        backgroundColor: colors.lightBlue,
        borderColor: colors.black,
        marginTop: 14,
        marginBottom: 6,
        elevation: 0
      },
      text: {
        ...base.text,
        color: colors.darkBlue
      },
      image: {
        ...base.image,
        tintColor: colors.darkBlue
      }
    }
  },
  secondaryMini: {
    default: {
      view: {
        ...baseMini.view,
        backgroundColor: colors.white,
        borderColor: colors.black
      },
      text: {
        ...baseMini.text,
        color: colors.darkBlue
      },
      image: {
        ...base.image,
        tintColor: colors.darkBlue
      }
    },
    pressed: {
      view: {
        ...baseMini.view,
        backgroundColor: colors.lightBlue,
        borderColor: colors.black
      },
      text: {
        ...baseMini.text,
        color: colors.darkBlue
      },
      image: {
        ...base.image,
        tintColor: colors.darkBlue
      }
    }
  }
}
