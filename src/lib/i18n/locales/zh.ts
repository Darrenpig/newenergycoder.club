import { maintainers, developers, designers, contributors, sponsors } from '../constants/team';
import { Translations } from '../types/translations';
import { learningTranslations } from '../constants/learning';

export const zhTranslations: Translations = {
  joinPage: {
    title: '鍔犲叆鎴戜滑鐨勪勘涔愰儴',
    subtitle: '鎴愪负鎴戜滑鍙寔缁紪绋嬬ぞ鍖虹殑涓€鍛?,
    wechat: {
      title: '寰俊缇?,
      description: '鍔犲叆鎴戜滑鐨勫井淇＄兢锛屼簡瑙ｆ渶鏂版洿鏂般€侀」鐩璁哄拰绀惧尯娲诲姩',
      id: 'NEC鏂拌兘婧愬紑鍙戣€呯ぞ鍖?,
      copyButton: '澶嶅埗缇ゅ悕',
      copied: '宸插鍒讹紒',
      addTips: '濡備綍鍔犲叆锛?,
      addTipsList: [
        '澶嶅埗涓婇潰鐨勭兢鍚?,
        '鎵撳紑寰俊',
        '鎼滅储缇ゅ悕',
        '鐢宠鍔犲叆'
      ]
    },
    roadmap: {
      title: '鎮ㄧ殑鏃呯▼',
      description: '浠庣敵璇峰埌鎴愪负鎴戜滑绀惧尯娲昏穬鎴愬憳鐨勮矾寰?,
      steps: [
        {
          title: '鎻愪氦鐢宠',
          description: '濉啓鎴戜滑鐨勪細鍛樼敵璇疯〃锛屽憡璇夋垜浠偍鐨勫叴瓒ｃ€佹妧鑳藉拰鍔ㄦ満',
          duration: '5-10鍒嗛挓'
        },
        {
          title: '鍒濇鑱旂郴',
          description: '鎴戜滑鐨勫洟闃熸垚鍛樺皢鍦?4灏忔椂鍐呴€氳繃鐢靛瓙閭欢涓庢偍鑱旂郴锛屽畨鎺掍粙缁嶄細璁?,
          duration: '24灏忔椂鍐?
        },
        {
          title: '浠嬬粛浼氳',
          description: '鍙傚姞浠嬬粛浼氳锛屼簡瑙ｆ垜浠殑椤圭洰銆佺ぞ鍖哄噯鍒欎互鍙婂浣曞紑濮?,
          duration: '30-45鍒嗛挓'
        },
        {
          title: '椤圭洰鍒嗛厤',
          description: '鏍规嵁鎮ㄧ殑鍏磋叮鍜屾妧鑳斤紝鎴戜滑灏嗕负鎮ㄥ垎閰嶄竴涓€傚悎鐨勯」鐩洟闃?,
          duration: '1-2澶?
        },
        {
          title: '寮€濮嬭础鐚?,
          description: '寮€濮嬪弬涓庢偍鐨勯」鐩洟闃燂紝鍙傚姞姣忓懆浼氳锛屽苟寮€濮嬩负寮€婧愰」鐩仛璐＄尞',
          duration: '绔嬪嵆寮€濮?
        }
      ]
    },
    cta: {
      title: '鍑嗗濂藉姞鍏ヤ簡鍚楋紵',
      description: '杩堝嚭绗竴姝ワ紝鎴愪负鎴戜滑鑷村姏浜庡彲鎸佺画鎶€鏈殑鍏呮弧娲诲姏鐨勭ぞ鍖虹殑涓€閮ㄥ垎',
      addWechat: '娣诲姞寰俊缇?,
      viewProject: '鏌ョ湅鎴戜滑鐨勯」鐩?,
      tip: '鎴戜滑杩笉鍙婂緟鍦版兂瑙佸埌鎮紒'
    },
    form: {
      name: '濮撳悕',
      email: '閭',
      phone: '鐢佃瘽',
      experience: '缁忛獙',
      interests: '鍏磋叮',
      submit: '鎻愪氦',
      submitting: '鎻愪氦涓?..',
      success: '鎻愪氦鎴愬姛',
      error: '鎻愪氦澶辫触'
    },
    benefits: {
      title: '浼氬憳绂忓埄',
      networking: '浜鸿剦鎷撳睍',
      learning: '瀛︿範鏈轰細',
      projects: '椤圭洰鍙備笌',
      career: '鑱屼笟鍙戝睍'
    }
  },
  join: {
    form: {
      title: '鍔犲叆NEC鏂拌兘婧愬紑鍙戣€呯ぞ鍖?,
      subtitle: '濉啓姝よ〃鏍兼垚涓烘垜浠ぞ鍖虹殑涓€鍛?,
      basicInfo: {
        title: '鍩烘湰淇℃伅',
        description: '璇锋彁渚涙偍鐨勫熀鏈仈绯讳俊鎭?,
        name: '濮撳悕',
        email: '閭鍦板潃',
        phone: '鐢佃瘽鍙风爜',
        organization: '缁勭粐/鍏徃',
        namePlaceholder: '璇疯緭鍏ユ偍鐨勫鍚?,
        emailPlaceholder: '璇疯緭鍏ユ偍鐨勯偖绠卞湴鍧€',
        phonePlaceholder: '璇疯緭鍏ユ偍鐨勭數璇濆彿鐮?,
        organizationPlaceholder: '璇疯緭鍏ユ偍鐨勭粍缁囨垨鍏徃'
      },
      roleInfo: {
        title: '瑙掕壊淇℃伅',
        description: '鍛婅瘔鎴戜滑鎮ㄧ殑涓撲笟鑳屾櫙',
        role: '瑙掕壊',
        rolePlaceholder: '璇疯緭鍏ユ偍鐨勮鑹?,
        experience: '缁忛獙',
        experiencePlaceholder: '鎻忚堪鎮ㄧ殑缁忛獙',
        identityLabel: '韬唤',
        student: '瀛︾敓',
        professional: '涓撲笟浜哄＋',
        freelancer: '鑷敱鑱屼笟鑰?,
        other: '鍏朵粬'
      },
      techStack: {
        title: '鎶€鏈妧鑳?,
        description: '閫夋嫨鎮ㄧ殑涓撲笟棰嗗煙',
        frontend: '鍓嶇寮€鍙?,
        backend: '鍚庣寮€鍙?,
        embedded: '宓屽叆寮忕郴缁?,
        ai: 'AI/鏈哄櫒瀛︿範',
        other: '鍏朵粬',
        otherPlaceholder: '璇疯鏄庡叾浠栨妧鑳?,
        options: ['鍓嶇', '鍚庣', '绉诲姩绔?, 'AI/ML', 'DevOps', '鏁版嵁绉戝']
      },
      experience: {
        title: '缁忛獙涓庡姩鏈?,
        description: '鍒嗕韩鎮ㄧ殑鑳屾櫙鍜岀洰鏍?,
        motivation: '鍔ㄦ満',
        motivationPlaceholder: '鎮ㄤ负浠€涔堟兂鍔犲叆锛?,
        experienceLabel: '鎶€鏈粡楠?,
        motivationLabel: '鍔ㄦ満',
        contributionLabel: '棰勬湡璐＄尞',
        experiencePlaceholder: '鎻忚堪鎮ㄧ殑鎶€鏈儗鏅?,
        contributionPlaceholder: '鎮ㄨ鍒掑浣曡础鐚紵'
      },
      timeExpectation: {
        title: '鏃堕棿鎶曞叆',
        description: '甯姪鎴戜滑浜嗚В鎮ㄧ殑鍙敤鏃堕棿',
        expectationsLabel: '鏈熸湜',
        expectationsPlaceholder: '鎮ㄥ淇变箰閮ㄦ湁浠€涔堟湡鏈涳紵',
        availabilityLabel: '姣忓懆鍙敤鏃堕棿锛堝皬鏃讹級',
        selectPlaceholder: '閫夋嫨鎮ㄧ殑鍙敤鏃堕棿',
        option1to2: '1-2灏忔椂',
        option3to5: '3-5灏忔椂',
        option6to10: '6-10灏忔椂',
        option10plus: '10+灏忔椂'
      },
      submit: {
        button: '鎻愪氦鐢宠',
        submitting: '鎻愪氦涓?..',
        success: '鐢宠宸叉彁浜?,
        successMessage: '鎰熻阿鎮ㄧ殑鐢宠锛佹垜浠皢瀹℃牳骞跺敖蹇洖澶嶆偍銆?,
        error: '鎻愪氦澶辫触',
        errorMessage: '鎻愪氦鐢宠鏃跺嚭鐜伴敊璇紝璇烽噸璇曘€?
      }
    }
  },
  nav: {
    home: '棣栭〉',
    projects: '椤圭洰',
    innovation: '鍒涙柊鎴愭灉',
    events: '娲诲姩',
    resources: '璧勬簮',
    contact: '鑱旂郴鎴戜滑',
    team: '鍥㈤槦',
    login: '鐧诲綍',
    logout: '閫€鍑?,
    joinClub: '鍔犲叆淇变箰閮?,
    dashboard: '鎺у埗鍙?
  },
  hero: {
    tagline: '娆㈣繋鏉ュ埌NEC鏂拌兘婧愬紑鍙戣€呯ぞ鍖?,
    title: '鏋勫缓鍙寔缁?,
    titleHighlight: '鏈潵',
    description: '鍔犲叆鎴戜滑鐨勭ぞ鍖猴紝閫氳繃寮€婧愰」鐩€佹妧鏈爺璁ㄤ細鍜屽崗浣滃涔狅紝鎺ㄥ姩鍙啀鐢熻兘婧愬拰鍙寔缁妧鏈殑鍙戝睍銆?,
    joinCommunity: '鍔犲叆绀惧尯',
    viewGithub: '鏌ョ湅Gitee',
    codingWorkshops: '缂栫▼宸ヤ綔鍧?,
    codingWorkshopsDesc: '姣忓懆鍔ㄦ墜缂栫▼宸ヤ綔鍧?,
    innovationProjects: '鍒涙柊椤圭洰',
    innovationProjectsDesc: '鍙啀鐢熻兘婧愬紑婧愰」鐩?,
    industryConnections: '琛屼笟鑱旂郴',
    industryConnectionsDesc: '涓庡彲鎸佺画鎶€鏈瀵艰€呭缓绔嬭仈绯?
  },
  about: {
    title: '鍏充簬鎴戜滑',
    paragraph1: 'NEC鏂拌兘婧愬紑鍙戣€呯ぞ鍖烘槸涓€涓敱瀛︾敓涓诲鐨勬妧鏈ぞ鍖猴紝鑷村姏浜庨€氳繃寮€婧愰」鐩拰鍗忎綔瀛︿範鎺ㄥ姩鍙寔缁妧鏈殑鍙戝睍銆傛垜浠殑浣垮懡鏄讥鍚堝彲鍐嶇敓鑳芥簮涓庤蒋浠跺紑鍙戜箣闂寸殑宸窛銆?,
    paragraph2: '鎴愮珛浜?024骞达紝鎴戜滑宸茬粡浠庝竴涓皬鍨嬪涔犲皬缁勫彂灞曟垚涓轰竴涓厖婊℃椿鍔涚殑绀惧尯锛屾嫢鏈夋潵鑷笉鍚屽绉戠殑娲昏穬璐＄尞鑰咃紝鍖呮嫭璁＄畻鏈虹瀛︺€佺數姘斿伐绋嬨€佺幆澧冪瀛︾瓑銆?,
    paragraph3: '鎴戜滑鐨勯」鐩兜鐩栦汉宸ユ櫤鑳姐€佺墿鑱旂綉銆佸祵鍏ュ紡绯荤粺鍜屾暟鎹垎鏋愶紝鎵€鏈夎繖浜涢兘涓撴敞浜庤В鍐冲彲鍐嶇敓鑳芥簮銆佽兘婧愭晥鐜囧拰鍙寔缁妧鏈柟闈㈢殑鐜板疄鎸戞垬銆?,
    learnMore: '浜嗚В鏇村',
    projectOrigin: {
      title: '椤圭洰璧锋簮',
      content: '鎴戜滑鐨勪勘涔愰儴鏈€鍒濇槸涓€涓笓娉ㄤ簬澶槼鑳介娴嬬殑灏忓瀷椤圭洰锛岀幇宸插彂灞曟垚涓轰竴涓患鍚堟€х殑鍙寔缁妧鏈ぞ鍖恒€傛垜浠殑鎴愰暱鏄敱瀛︾敓銆佹暀鑲插伐浣滆€呭拰琛屼笟涓撲笟浜哄＋鐨勫崗浣滃姫鍔涙帹鍔ㄧ殑銆?
    },
    phase2: {
      title: '绗簩闃舵锛氱ぞ鍖烘墿灞?,
      description: '瓒呰秺鍒濆椤圭洰',
      content: '闅忕潃鎴戜滑鏃╂湡椤圭洰鐨勬垚鍔燂紝鎴戜滑灏嗚寖鍥存墿灞曞埌鍖呮嫭椋庤兘浼樺寲銆佹櫤鑳界數缃戞妧鏈拰鍙寔缁氦閫氳В鍐虫柟妗堬紝鍚屾椂淇濇寔瀵瑰紑婧愬紑鍙戠殑寮虹儓鍏虫敞銆?
    },
    contributing: {
      title: '璐＄尞',
      description: '鎴戜滑濡備綍鏋勫缓绀惧尯',
      howToContribute: '濡備綍璐＄尞',
      steps: [
        '閫氳繃鎴戜滑鐨凣itee浠撳簱鍔犲叆',
        '鍙傚姞姣忓懆宸ヤ綔鍧?,
        '鍙備笌寮€婧愰」鐩?,
        '涓庡洟闃熸垚鍛樺崗浣?,
        '鍒嗕韩鐭ヨ瘑鍜屾渶浣冲疄璺?
      ],
      codeOfConduct: '琛屼负鍑嗗垯',
      reportIssues: '鎶ュ憡闂',
      submitPR: '鎻愪氦鎷夊彇璇锋眰'
    },
    license: {
      title: '璁稿彲璇?,
      description: '寮€婧愭壙璇?,
      openSource: '鎴戜滑鎵€鏈夌殑椤圭洰閮藉湪MIT璁稿彲璇佷笅寮€婧?,
      permissions: ['鍟嗕笟浣跨敤', '淇敼', '鍒嗗彂', '绉佷汉浣跨敤'],
      limitations: ['璐ｄ换', '鎷呬繚'],
      conditions: ['璁稿彲璇佸拰鐗堟潈澹版槑']
    }
  },
  features: {
    title: '淇变箰閮ㄧ壒鑹?,
    subtitle: '鍔犲叆鎴戜滑鐨勭ぞ鍖猴紝浜彈杩欎簺鐙壒鐨勫ソ澶?,
    weeklyWorkshops: '姣忓懆宸ヤ綔鍧?,
    weeklyWorkshopsDesc: '瀹氭湡涓惧姙缂栫▼鍜屾妧鏈爺璁ㄤ細',
    openSource: '寮€婧愰」鐩?,
    openSourceDesc: '涓虹湡瀹炵殑鍙寔缁妧鏈」鐩仛璐＄尞',
    hackathons: '榛戝椹媺鏉?,
    hackathonsDesc: '鍙傚姞涓撴敞鐨勭紪鐮佹寫鎴?,
    guestSpeakers: '瀹㈠骇婕旇鑰?,
    guestSpeakersDesc: '鍚戣涓氫笓瀹跺涔?,
    networking: '缃戠粶浜ゆ祦',
    networkingDesc: '涓庡織鍚岄亾鍚堢殑浜哄缓绔嬭仈绯?,
    conferences: '浼氳',
    conferencesDesc: '鍙傚姞鍙寔缁妧鏈椿鍔?
  },
  team: {
    title: '鎴戜滑鏄皝锛?,
    description: '涓€缇ゅ湪浠ｇ爜涓庢ⅵ鎯充氦姹囧鐩搁亣鐨勪汉銆傝繖閲屾湁娣卞璋冭瘯鐨勫鐢燂紝鏈夎拷姹備紭闆呯殑寮€鍙戣€咃紝鏈夌棿杩蜂簬銆屽浣曡涓栫晫鏇撮珮鏁堛€佹洿娓呮磥銆嶇殑鍙寔缁妧鏈俊寰掋€?鎴戜滑涓嶅悓鈥斺€斾笓涓氥€佽儗鏅€佺敋鑷冲枩娆㈢殑缂栫▼璇█閮藉彲鑳戒笉涓€鏍枫€備絾鎴戜滑鐩稿悓鈥斺€旂浉淇℃妧鏈悜鍠勶紝鐩镐俊骞磋交鐨勫姏閲忥紝鐩镐俊鍙寔缁笉鏄€夋嫨鑰屾槸蹇呴』銆?鍦ㄨ繖閲岋紝濂藉蹇冩槸閫氳璇侊紝瀹炶返鏄€氱敤璇€傛垜浠笉鍙槸鏋勫缓浜у搧锛屾洿鏄湪鏋勫缓蹇冧腑閭ｄ釜鏇寸豢鑹层€佹洿鍏钩銆佹洿鏅鸿兘鐨勬湭鏉ャ€?鎴戜滑锛屾槸涓€涓鍔ㄥ姩璇嶃€?,
    maintainerTitle: '缁存姢鑰?,
    developerTitle: '寮€鍙戣€?,
    designerTitle: '璁捐甯?,
    preMaintainerTitle: '棰勫缁存姢鑰?,
    researcherTitle: '鐮旂┒鍛?,
    contributorTitle: '璐＄尞鑰?,
    sponsorTitle: '璧炲姪鍟?,
    viewFullTeam: '鏌ョ湅瀹屾暣鍥㈤槦',
    teamPhoto: '鍥㈤槦鐓х墖',
    analytics: {
      title: '鍥㈤槦鍒嗘瀽',
      description: '鎴戜滑绀惧尯澧為暱鐨勮缁嗙粺璁?,
      totalMembers: '鎬绘垚鍛?,
      activeContributors: '娲昏穬璐＄尞鑰?,
      giteeReference: 'Gitee鍙傝€?,
      lastUpdated: '鏈€鍚庢洿鏂?,
      roleDistribution: '瑙掕壊鍒嗗竷',
      contributionStats: '璐＄尞缁熻',
      mainResponsibilities: '涓昏鑱岃矗',
      maintainerResponsibilities: '椤圭洰绠＄悊銆佷唬鐮佸鏍搞€佹妧鏈喅绛?,
      developerResponsibilities: '鍔熻兘寮€鍙戙€丅ug淇銆佹妧鏈疄鐜?,
      designerResponsibilities: '鐣岄潰璁捐銆佺敤鎴蜂綋楠屻€佽瑙夎鑼?,
      contributorResponsibilities: '鏂囨。缂栧啓銆佹祴璇曞弽棣堛€佺ぞ鍖烘敮鎸?
    },
    teamPhotoDescription: '鍥㈤槦鎴愬憳鍦ㄩ」鐩紑鍙戣繃绋嬩腑鐨勭弽璐靛悎褰憋紝璁板綍浜嗘垜浠叡鍚屽姫鍔涘拰鍗忎綔鐨勭編濂芥椂鍏夈€?,
    researchers: [
      {
        name: '寰愬悍',
        role: 'Researcher',
        bio: '鎿呴暱3D鎵撳嵃寤烘ā/鑸ā鐢垫満椹卞姩锛屼笓娉ㄤ簬瀛︽湳鐮旂┒銆?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/researcher/寰愬悍.jpg',
        tags: ['3D鎵撳嵃', '寤烘ā', 'SolidWorks', '瀛︽湳鐮旂┒']
      },
      {
        name: '闄嗗畤璞?,
        role: 'Researcher',
        bio: '鍦ㄨ鐮旂┒鐢燂紝涓撴敞浜庡鏈笌Aspen V8涓嶢I鎶€鏈爺绌躲€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/researcher/闄嗗畤璞?jpg',
        tags: ['鐮旂┒鐢?, '瀛︽湳鐮旂┒', '鎶€鏈帰绱?]
      }
    ],
    preMaintainers: [
      {
        name: '鍗㈢帇娣?,
        role: '25RC椤圭&鏈烘&鐢垫帶',
        bio: '25RC椤圭洰绠＄悊锛屾満姊板拰鐢垫帶棰嗗煙鐨勫涔犺€咃紝Pre-Maintainer鍩瑰吇涓€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/preMaintainer/鍗㈢帇娣?jpg',
        tags: ['椤圭洰绠＄悊', '鏈烘璁捐', '鐢垫帶瀛︿範', 'ROBOCON', 'Pre-Maintainer', '25RC'],
        github: 'https://github.com/luwangchun'
      },
      {
        name: '寰愭捣濠?,
        role: 'Pre-Maintainer&璐㈠姟绠＄悊',
        bio: '鑱氱劍璐㈠姟娴佺▼浼樺寲涓庢暟鎹敮鎾戯紝閫氳繃鍚堢悊棰勭畻銆侀闄╅槻鎺э紝鍔╁姏鎶€鏈疄璺点€佽绋宠嚧杩溿€侾re-Maintainer鍩瑰吇涓€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/preMaintainer/寰愭捣濠?jpg',
        tags: ['璐㈠姟绠＄悊', '棰勭畻鎺у埗', '椋庨櫓闃叉帶', 'Pre-Maintainer', '鎴愭湰绠℃帶']
      },
      {
        name: '鍗曞箍蹇?,
        role: 'Pre-Maintainer&宓屽叆寮忓紑鍙?,
        bio: '鏈哄櫒浜鸿涓氱數鎺ч┍鍔ㄥ紑鍙戜互鍙婄‖浠剁數璺璁★紝Pre-Maintainer鍩瑰吇涓€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/preMaintainer/鍗曞箍蹇?png',
        tags: ['宓屽叆寮忓紑鍙?, '鐢垫帶椹卞姩', '纭欢鐢佃矾璁捐', 'Pre-Maintainer', '鏈哄櫒浜?, 'STM32'],
        github: 'https://github.com/shanguangzhi'
      },
      {
        name: '璁稿瓙娑?,
        role: 'Pre-Maintainer&浜у搧缁忕悊',
        bio: '璐熻矗浜у搧瑙勫垝鍜岄渶姹傚垎鏋愶紝鎺ㄥ姩椤圭洰鍚戞纭柟鍚戝彂灞曪紝Pre-Maintainer鍩瑰吇涓€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/preMaintainer/璁稿瓙娑?png',
        tags: ['浜у搧瑙勫垝', '闇€姹傚垎鏋?, '鐢ㄦ埛鐮旂┒', 'Pre-Maintainer', '鍘熷瀷璁捐'],
        github: 'https://github.com/xuzihan'
      }
    ],
    maintainers: [
      {
        name: 'DarrenPig',
        role: 'Club Founder & BSP 宓岃蒋宸ョ▼甯?,
        bio: 'Renewable energy researcher with a focus on AI applications for energy optimization.',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/maintainer/DarrenPig.jpg',
        tags: ['AI', 'BSP', '宓屽叆寮?, 'ROBOCON', '鑳芥簮鐩戞祴', 'openEuler'],
        github: 'https://github.com/Darrenpig',
        email: '22230635@czu.cn'
      },
      {
        name: '娈风粺鍒?,
        role: 'Club Founder & BSP Expert',
        bio: '涓撴敞浜嶢I鍦ㄨ兘婧愪紭鍖栧簲鐢ㄧ殑鍙啀鐢熻兘婧愮爺绌跺憳銆?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/maintainer/娈风粺鍒?jpg',
        tags: ['AI', 'BSP', '鑳芥簮浼樺寲', '鍙啀鐢熻兘婧?, '鍗庝负浜慉I'],
        github: 'https://github.com/yintongchuang'
      },
      {
        name: '璁哥彂璇?,
        role: '鏈哄櫒浜虹畻娉曞伐绋嬪笀',
        bio: '涓撴敞浜庢満鍣ㄤ汉绠楁硶鐮斿彂閮ㄧ讲浠ュ強涓氬姟閫昏緫璁捐銆?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/maintainer/璁哥彂璇?jpg',
        tags: ['鏈哄櫒浜虹畻娉?, 'ROBOCON', '浜哄舰鏈哄櫒浜?, '绠楁硶閮ㄧ讲', 'ROS'],
        github: 'https://github.com/xulongyi'
      },
      {
        name: '寮犳椇鏃?,
        role: '鏈哄櫒浜鸿繍琛屾椂宸ョ▼甯?,
        bio: '璐熻矗椤圭洰鐨勬牳蹇冩妧鏈敾鍧氾紝淇濋殰鐢垫帶绯荤粺鐨勭ǔ瀹氳繍琛屻€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/maintainer/寮犳椇鏃?jpg',
        tags: ['鐢垫帶绯荤粺', '杩愯鏃?, 'ROBOCON', '宓屽叆寮?, '绯荤粺绋冲畾鎬?],
        github: 'https://github.com/zhangwangwang'
      }
    ],
    developers: [
      {
        name: '鍒樿嫳鐞?,
        role: '宓屽叆寮忓紑鍙戝伐绋嬪笀',
        bio: '涓撴敞浜庣幇浠ｆ満鍣ㄤ汉鎶€鏈爤锛岃嚧鍔涗簬鏋勫缓楂樻€ц兘鐨勬満鍣ㄤ汉鐣岄潰銆?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/developer/鍒樿嫳鐞?png',
        tags: ['React', 'TypeScript', 'Vue', '鍓嶇鏋舵瀯', 'UI/UX', 'Vite'],
        github: 'https://github.com/liuyingqi'
      },

      {
        name: '鍛ㄥ織',
        role: '鍏ㄦ爤寮€鍙戝伐绋嬪笀',
        bio: '鍏峰鍓嶅悗绔紑鍙戣兘鍔涳紝鑷村姏浜庣鍒扮鐨勮В鍐虫柟妗堝紑鍙戙€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/developer/鍛ㄥ織.png',
        tags: ['鍏ㄦ爤寮€鍙?, 'JavaScript', 'Python', 'React', 'Node.js', '椤圭洰绠＄悊'],
        github: 'https://github.com/zhouzhi'
      },
      {
        name: '鏉庣',
        role: '纭欢绯荤粺鏋舵瀯甯?,
        bio: '涓撴敞浜庣‖浠剁郴缁熸灦鏋勮璁″拰鎶€鏈€夊瀷锛屼负椤圭洰鎻愪緵鎶€鏈寚瀵笺€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/developer/鏉庣.png',
        tags: ['绯荤粺鏋舵瀯', '鎶€鏈€夊瀷', '鍒嗗竷寮忕郴缁?, '鎬ц兘浼樺寲', '浜戝師鐢?, 'Kubernetes'],
        github: 'https://github.com/lishuo'
      },
      {
        name: '鐗涜壇鏃?,
        role: 'DevOps鐢垫睜绠＄悊宸ョ▼甯?,
        bio: '璐熻矗椤圭洰鐨勬寔缁泦鎴愬拰閮ㄧ讲锛屼繚闅滃紑鍙戞祦绋嬬殑楂樻晥杩愯銆?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/developer/鐗涜壇鏃?jpg',
        tags: ['DevOps', 'CI/CD', 'Docker', 'Kubernetes', 'GitHub Actions', '鑷姩鍖栭儴缃?],
        github: 'https://github.com/niuliangxu'
      },
      {
        name: '閮戦挦鏂?,
        role: '鏈虹數涓€浣撳寲寮€鍙戝伐绋嬪笀',
        bio: '涓撴敞浜庢満鐢佃璁″紑鍙戯紝涓虹敤鎴锋彁渚涗紭璐ㄧ殑绉诲姩绔綋楠屻€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/developer/閮戦挦鏂?jpg',
        tags: ['React Native', 'Flutter', 'iOS', 'Android', '绉诲姩绔紭鍖?, '璺ㄥ钩鍙板紑鍙?],
        github: 'https://github.com/zhengqinwen'
      },
      {
        name: '鏉ㄥ姏婊?,
        role: '鏄熼棯鎵嬫焺寮€鍙戝伐绋嬪笀',
        bio: '鏄熼棯鎵嬫焺寮€鍙戜笓瀹讹紝鐔熸倝STM32+RTOS C璇█寮€鍙戙€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/developer/鏉ㄥ姏婊?JPG',
        tags: ['鏄熼棯鎵嬫焺', 'STM32', 'RTOS', 'C璇█', '宓屽叆寮忓紑鍙?, '纭欢鎺у埗'],
        github: 'https://github.com/yanglitao'
      },
      {
        name: '褰煰棰?,
        role: '鏈烘R1鏈哄櫒浜哄紑鍙戣€?,
        bio: '鏂板姞鍏ョ殑寮€鍙戝洟闃熸垚鍛橈紝绉瀬鍙備笌鏈哄櫒浜洪」鐩紑鍙戯紝瀛︿範鏂版妧鏈€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/developer/褰煰棰?jpg',
        tags: ['鏂版垚鍛?, '椤圭洰寮€鍙?, '瀛︿範鎴愰暱', 'Web寮€鍙?, 'JavaScript', '鍥㈤槦鍗忎綔'],
        github: 'https://github.com/pengkeying'
      },
      {
        name: '瀛熸磥',
        role: '宓屽叆寮忚蒋浠跺伐绋嬪笀',
        bio: '涓撴敞浜?STM32銆丷TOS 涓庨┍鍔ㄥ紑鍙戯紝鎿呴暱 C/C++銆?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/developer/瀛熸磥.jpg',
        tags: ['STM32', 'RTOS', 'C/C++', '椹卞姩寮€鍙?]
      },
      {
        name: '鏂囬挵濠?,
        role: '宓屽叆寮忚蒋浠跺伐绋嬪笀',
        bio: '鐔熸倝瀹炴椂鎿嶄綔绯荤粺涓庨┍鍔ㄥ紑鍙戯紝鑱氱劍 C/C++ 涓?STM32銆?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/developer/鏂囬挵濠?jpg',
        tags: ['STM32', 'RTOS', 'C/C++', '椹卞姩寮€鍙?]
      },
      {
        name: '寮犻練杞?,
        role: '鐗╂祦鑷姩鍖栫郴缁熷伐绋嬪笀',
        bio: '鑱氱劍 PLC銆佹満鍣ㄨ瑙変笌鏅鸿兘鍒嗘嫞绯荤粺鐨勫伐绋嬪疄鐜颁笌浼樺寲銆?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/developer/寮犻練杞?jpg',
        tags: ['鐗╂祦鑷姩鍖?, 'PLC', '鏈哄櫒瑙嗚', '鍒嗘嫞绯荤粺', '宸ヤ笟鎺у埗']
      }
    ],
    designers: [
      {
        name: 'Xiux',
        role: 'UI/UX璁捐甯?& 浠撳簱PM',
        bio: '涓撴敞浜庡紑鍙戣€呬綋楠岃璁″拰鐣岄潰浼樺寲锛屼负鍙寔缁粨搴撳垱閫犵編瑙傛槗鐢ㄧ殑鐣岄潰銆?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/designer/xiux.jpg',
        tags: ['UI璁捐', 'UX璁捐', 'Figma', 'Sketch', '鍘熷瀷璁捐', '鐢ㄦ埛鐮旂┒']
      },
      {
        name: 'ikkOoOo',
        role: '宸ヤ笟/浜у搧璁捐甯?,
        bio: '涓撴敞浜庡垱鎰忚璁″拰瑙嗚琛ㄨ揪锛屼负椤圭洰鎻愪緵鐙壒鐨勮璁¤瑙掋€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/designer/ikkOoOo.jpg',
        tags: ['鍒涙剰璁捐', '瑙嗚琛ㄨ揪', '璁捐鍒涙柊', '鑹烘湳鎸囧', '鍝佺墝璁捐', '瑙嗚浼犺揪']
      },
      {
        name: '寮犺嫢鐠?,
        role: '瑙嗚璁捐甯?璐㈠姟鍒嗘瀽甯?,
        bio: '涓撴敞浜庡搧鐗岃惤鍦板拰璐㈠姟鍒嗘瀽锛屼负椤圭洰鎻愪緵涓撲笟鐨勮储鍔¤瑙掑彲琛屾€ц惤鍦拌璁°€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/designer/寮犺嫢鐠?jpg',
        tags: ['鍝佺墝璁捐', 'Power BI', 'Logo璁捐', '鑹插僵鎼厤']
      },
      {
        name: '闊﹀僵鏃?,
        role: '宸ヤ笟浜у搧璁捐甯?,
        bio: '璐熻矗瀵规帴闇€姹傦紝涓撴敞浜庡伐涓氫骇鍝佽璁★紝涓洪」鐩彁渚涗笓涓氱殑璁捐瑙ｅ喅鏂规銆?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/designer/闊﹀僵鏃?jpg',
        tags: ['宸ヤ笟璁捐', '浜у搧璁捐', '闇€姹傚鎺?, '璁捐瑙ｅ喅鏂规', '鐢ㄦ埛浣撻獙', '浜у搧瑙勫垝']
      },
      {
        name: '鏉庝竴妤?,
        role: '杩愯惀缁勯暱',
        bio: '涓篘EC灏忛槦瀹ｄ紶浠ュ強涓绘寔锛岃礋璐ｅ洟闃熻繍钀ュ拰瀵瑰瀹ｄ紶宸ヤ綔銆?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/designer/鏉庝竴妤?jpg',
        tags: ['鍥㈤槦杩愯惀', '瀹ｄ紶绛栧垝', '娲诲姩涓绘寔', 'NEC灏忛槦', '瀵瑰鑱旂粶', '鍝佺墝鎺ㄥ箍']
      },
      {
        name: '鏉庢兂',
        role: 'UX璁捐甯?,
        bio: '涓€鐩村湪鎺㈢储鎶€鏈笌璁捐杈圭晫鐨勮矾涓婏紝浠ョ敤鎴蜂负涓績锛屼互浣撻獙涓洪┍鍔ㄣ€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/designer/鏉庢兂.jpg',
        tags: ['UX璁捐', '鐢ㄦ埛浣撻獙', '璁捐鎬濈淮', 'Figma', '鐢ㄦ埛鏃呯▼', '淇℃伅鏋舵瀯']
      },
      {
        name: '鐜嬪溅鍚?,
        role: '宸ヤ笟/浜у搧璁捐甯?,
        bio: '鑷村姏浜庨€氳繃璁捐瑙ｅ喅瀹為檯闂锛屼互鏇村紑鏀剧殑鎬佸害瀵绘壘鏇村鍙兘鎬с€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/contributer/鐜嬪溅鍚?jpg',
        tags: ['宸ヤ笟璁捐', '浜у搧璁捐', 'SolidWorks', 'Rhino', '3D寤烘ā', '鏉愭枡宸ヨ壓']
      }
    ],
    contributors: [
      {
        name: '鍗㈡案鏉?,
        role: '宓屽叆寮?杩愭帶绠楁硶涓撳',
        bio: '涓撴敞绠楁硶閮ㄧ讲浼樺寲鍙夿SP閫昏緫鍗忓悓璁捐锛屽湪宓屽叆寮忓拰杩愭帶绠楁硶棰嗗煙鏈夋繁鍏ョ爺绌躲€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/contributer/鍗㈡案鏉?jpg',
        tags: ['宓屽叆寮忓紑鍙?, '杩愭帶绠楁硶', '绠楁硶閮ㄧ讲', '鍗忓悓璁捐', '绠楁硶浼樺寲'],
        github: 'https://github.com/luyongjie'
      },

      {
        name: '宕旀闃?,
        role: 'Developer',
        bio: '涓撴敞浜庝笂浣嶆満杞欢璐ㄩ噺淇濊瘉锛岀‘淇濋」鐩殑绋冲畾鎬у拰鍙潬鎬с€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/contributer/宕旀闃?jpg',
        tags: ['娴烽弗娲?, 'Liunx', 'openEuler', '鑷姩鍖栨祴璇?, '鎬ц兘娴嬭瘯'],
        github: 'https://github.com/cuizhengyang'
      },
      {
        name: '鐜嬩簬璞?,
        role: '鎴愬瀷缁勭粍闀?,
        bio: '璋冭瘯3D鎵撳嵃鏈哄府鍔╁洟闃熸墦鍗扮墿鍝侊紝璐熻矗鎴愬瀷缁勭殑绠＄悊鍜屾妧鏈敮鎸佸伐浣溿€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/鐜嬩簬璞?jpg',
        tags: ['3D鎵撳嵃', '鎴愬瀷鎶€鏈?, '鍥㈤槦绠＄悊', '鎶€鏈敮鎸?, '璁惧璋冭瘯', '鐗╁搧鍒朵綔'],
        github: 'https://github.com/wangyuhao'
      },
      {
        name: '闂诲織浼?,
        role: 'Bronze Sponsor',
        bio: '鑷村姏浜庢帹鍔ㄥ彲鎸佺画鎶€鏈彂灞曠殑涓汉璧炲姪鑰呫€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/developer/闂诲織浼?jpg',
        tags: ['鎶€鏈禐鍔?, '椤圭洰鏀寔', '鍙寔缁彂灞?, '鍒涙柊璧勫姪', '绀惧尯寤鸿', '浜烘墠鍩瑰吇']
      },
      {
        name: '寮犳椇鏃?,
        role: '鏂拌兘婧愯繍缁村伐绋嬪笀',
        bio: '璐熻矗鏍稿績椤圭洰鐨勭湡鏈洪儴缃插拰杩愮淮宸ヤ綔锛屼繚闅滅郴缁熺殑绋冲畾杩愯銆?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/contributer/寮犳椇鏃?jpg',
        tags: ['杩愮淮閮ㄧ讲', 'Linux', '鏈嶅姟鍣ㄧ鐞?, '鐩戞帶鍛婅', '鏁呴殰鎺掓煡', '绯荤粺浼樺寲'],
        github: 'https://github.com/zhangwangwang'
      },
      {
        name: '鍚存礇鏂?,
        role: '寮€婧愯础鐚€?姘斿姩鑷姩鍖栦笓瀹?,
        bio: '绉瀬鍙備笌寮€婧愰」鐩紝涓虹ぞ鍖鸿础鐚唬鐮佸晢涓氬寲鏂囨。銆?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/contributer/鍚存礇鏂?jpg',
        tags: ['姘斿姩鑷姩鍖?, '寮€婧愯础鐚?, '宸ヤ笟鎺у埗', 'PLC', '鑷姩鍖栫郴缁?],
        github: 'https://github.com/wuluobin'
      },
      {
        name: '浣欐旦閾?,
        role: '鏈哄櫒浜烘棩蹇楄繍钀ョ紪杈?,
        bio: '涓撴敞浜庡浼犲拰鏂囧瓧锛岃NEC鐨勬瘡涓€浠界悊蹇甸兘鑳借鐪嬭銆?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/developer/浣欐旦閾?jpg',
        tags: ['鏂囪壓宸ヤ綔', '杩愯惀缂栬緫', '瀹ｄ紶绛栧垝', '鏂囧瓧缂栬緫', 'NEC鐞嗗康', '鍐呭鍒涗綔'],
        github: 'https://github.com/yuhaoming'
      },

      {
        name: '鍗炰箰鍑?,
        role: '宓屽叆寮忓涔犺础鐚€?,
        bio: '宓屽叆寮忓涔犱腑锛岀Н鏋佸弬涓庡紑婧愰」鐩拰绀惧尯寤鸿銆?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/contributer/鍗炰箰鍑?jpg',
        tags: ['宓屽叆寮忓涔?, '寮€婧愯础鐚?, '绀惧尯寤鸿', 'STM32', '纭欢寮€鍙?],
        github: 'https://github.com/bianleiling'
      },


      {
        name: '寮犲博鐨?,
        role: '鎽勫奖&鏁版嵁鍙鍖?璁捐甯?杩愯惀鍗氫富',
        bio: '浼氭憚褰憋紝瀛﹁壓鏈璁★紝鍋氭紓浜锛屼笓娉ㄤ簬鎽勫奖銆佹暟鎹彲瑙嗗寲璁捐鍜岃繍钀ユ帹骞裤€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/designer/寮犲博鐨?jpg',
        tags: ['鎽勫奖', '鏁版嵁鍙鍖?, '鑹烘湳璁捐', '杩愯惀鍗氫富', '瑙嗚浼犺揪', '鍐呭鍒涗綔']
      },
      {
        name: '閮戠粛鎭?,
        role: '绠楁硶绔炶禌閫夋墜',
        bio: '涓撴敞浜庣畻娉曠爺绌朵互鍙婃渶浼樺寲闂',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/閮戠粛鎭?png',
        tags: ['绠楁硶鐮旂┒', '鏈€浼樺寲', '绔炶禌閫夋墜', '闂姹傝В', '绠楁硶浼樺寲', '鏁板寤烘ā'],
        github: 'https://github.com/zhengshaokai'
      },
      {
        name: '鏉ㄩ懌娴?,
        role: 'Developer',
        bio: '涓撴敞浜嶢rduino鍜孍SP32绛夊紑鍙戞澘鐨勪唬鐮佷緥绋嬪紑鍙戙€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/contributer/鏉ㄩ懌娴?jpg',
        tags: ['Arduino', 'ESP32', '浠ｇ爜渚嬬▼', '宓屽叆寮忓紑鍙?, '鐗╄仈缃?, '寮€鍙戞澘'],
        github: 'https://github.com/yangxinhai'
      },
      {
        name: '娈峰瓙璞?,
        role: 'Developer&鏂囪壓宸ヤ綔鑰?,
        bio: '杩愯惀瀹ｄ紶涓庢枃瀛楃紪杈戯紝璐熻矗鍥㈤槦鍐呭鍒涗綔鍜屽澶栦紶鎾€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/contributer/娈峰瓙璞?jpg',
        tags: ['杩愯惀瀹ｄ紶', '鏂囧瓧缂栬緫', '鍐呭鍒涗綔', '鍥㈤槦浼犳挱', '鏂囨绛栧垝', '鍝佺墝寤鸿'],
        github: 'https://github.com/yinzihao'
      },
      {
        name: '瀛欏濠?,
        role: '鐏靛阀鎵嬫í鍚戝紑鍙戣础鐚€?,
        bio: '涓撴敞浜庣伒宸ф墜鐨勬í鍚戝紑鍙戯紝涓洪」鐩彁渚涘垱鏂扮殑鎶€鏈В鍐虫柟妗堝拰寮€鍙戞敮鎸併€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/contributer/瀛欏濠?jpg',
        tags: ['鐏靛阀鎵嬪紑鍙?, '妯悜寮€鍙?, '鎶€鏈垱鏂?, '寮€鍙戞敮鎸?, '椤圭洰璐＄尞', '鎶€鏈В鍐虫柟妗?],
        github: 'https://github.com/sunrujie'
      },
      {
        name: '鏉ㄥ僵濡?,
        role: 'Contributor',
        bio: 'AIC宸ヤ笟瑙嗚SIG pre-sponsor锛屼笓娉ㄤ簬宸ヤ笟瑙嗚鎶€鏈殑鐮旂┒鍜屽簲鐢ㄣ€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/鏉ㄥ僵濡?jpg',
        tags: ['宸ヤ笟瑙嗚', 'AIC', 'SIG', 'pre-sponsor', '瑙嗚鎶€鏈?, '鎶€鏈爺绌?],
        github: 'https://github.com/yangcaini'
      },
      {
        name: '瀛欒瘲鐫?,
        role: 'Contributor',
        bio: 'AIC宸ヤ笟瑙嗚SIG 宓岀‖-鍗曠墖鏈轰笓瀹讹紝涓撴敞浜庡祵鍏ュ紡纭欢鍜屽崟鐗囨満寮€鍙戙€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/瀛欒瘲鐫?jpg',
        tags: ['宓屽叆寮忕‖浠?, '鍗曠墖鏈?, 'AIC', '宸ヤ笟瑙嗚', 'SIG', '纭欢寮€鍙?],
        github: 'https://github.com/sunshirui'
      },
      {
        name: '闊╃ズ鍐?,
        role: 'Contributor',
        bio: '鏁版嵁鍒嗘瀽甯堬紝涓撴敞浜庢暟鎹鐞嗗拰鍙鍖栧垎鏋愬伐浣溿€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/闊╃ズ鍐?jpg',
        tags: ['鏁版嵁鍒嗘瀽', '鏁版嵁澶勭悊', '缁熻鍒嗘瀽', '鏁版嵁鍙鍖?, '涓氬姟鍒嗘瀽'],
        gitee: 'https://gitee.com/han-qiran'
      },
      {
        name: '閮绔?,
        role: '鍦烘帶FD',
        bio: '涓撴敞浜庡祵鍏ュ紡銆佹満鍣ㄨ瑙変笌纭欢鐮斿彂銆?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/閮绔?jpg',
        tags: ['鍦烘帶FD', '宓屽叆寮?, '鏈哄櫒瑙嗚', '纭欢'],
        gitee: 'https://gitee.com/guo--tongtong'
      },
      {
        name: '鍚存ⅵ濠?,
        role: '璐＄尞鑰?,
        bio: '澶у垱鐨勬苯杞﹀彂鍔ㄦ満/鐢垫満鍒濆垱椤圭洰杩涜涓€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/鍚存ⅵ濠?jpg',
        tags: ['澶у垱', '姹借溅鍙戝姩鏈?, '鐢垫満', '鍒濆垱椤圭洰']
      },
      {
        name: '闄堟槬鏋?,
        role: '瑙嗚绠楁硶',
        bio: '楂樹簩濂ユ灄鍖瑰厠鍖栧骞胯タ甯備簩绛夊锛孯C27棰勫闃熷憳銆?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/闄堟槬鏋?jpg',
        tags: ['瑙嗚绠楁硶', '濂ユ灄鍖瑰厠鍖栧', 'RC27', '棰勫闃熷憳']
      },
      {
        name: '鐧介€搁福',
        role: '璐＄尞鑰?,
        bio: 'RC 鍏ㄥ浗鏈哄櫒浜哄ぇ璧涘弬涓庤€咃紝浠撳簱鏁板瓧鍖栵紝AI椋炰功鍘熺敓寮€鍙戙€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/鐧介€搁福.jpg',
        tags: ['RC', '鍏ㄥ浗鏈哄櫒浜哄ぇ璧?, '浠撳簱鏁板瓧鍖?, 'AI椋炰功', '鍘熺敓寮€鍙?]
      },
      {
        name: '涓ユ枃棰?,
        role: '璐＄尞鑰?,
        bio: '璐熻矗鏁版嵁搴撶鐞嗕笌杩愯惀宸ヤ綔銆?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/涓ユ枃棰?jpg',
        tags: ['鏁版嵁搴?, '杩愯惀', '鏁版嵁绠＄悊']
      },
      {
        name: '鏉庡槈娑?,
        role: '璐＄尞鑰?,
        bio: '鑾峰緱杩囧浗瀹跺瀛﹂噾锛屼細SolidWorks銆丆ATIA绛夎蒋浠讹紝鐩墠鍦ㄥ仛澶у垱銆?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/鏉庡槈娑?jpg',
        tags: ['鍥藉濂栧閲?, 'SolidWorks', 'CATIA', '澶у垱']
      },
      {
        name: '榛勫畤闆?,
        role: '璐＄尞鑰?,
        bio: '杩愮敤涓夌淮寤烘ā杞欢杩涜鏈烘瀯璁捐銆佸姩鐢绘紨绀恒€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/榛勫畤闆?jpg',
        tags: ['涓夌淮寤烘ā', '鏈烘瀯璁捐', '鍔ㄧ敾婕旂ず']
      },
      {
        name: '榄忓崼',
        role: '璐＄尞鑰?,
        bio: '閲庡績澶х殑鍗婂悐瀛愬叏鏍?涓嶇纭欢鐗?銆?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/榄忓崼.jpg',
        tags: ['鍏ㄦ爤寮€鍙?, '杞欢寮€鍙?]
      },
      {
        name: '姊佹柊闆?,
        role: '闃熷憳',
        bio: '姣棤缁忛獙鐨勪竴鍙皬鐧斤紝姝ｅ湪鍔姏瀛︿範涓€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/姊佹柊闆?jpg',
        tags: ['灏忕櫧', '闃熷憳', '瀛︿範涓?]
      },
      {
        name: '椤句匠娆?,
        role: 'Contributor',
        bio: '涓撴敞浜庢暟鎹簱涓嶶nity鏁版嵁浼犲鎶€鏈€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/椤句匠娆?jpg',
        tags: ['鏁版嵁搴?, 'Unity', '鏁版嵁浼犲']
      },

      {
        name: '鐜嬫鎬?,
        role: '鐢垫帶缁勬垚鍛?,
        bio: '鍙鏄涔犳満鏋勪腑鐨勭數鎺ч儴鍒嗭紝瀛︿範杩?1锛?2鍗曠墖鏈轰互鍙妔w寤烘ā銆?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/鐜嬫鎬?jpg',
        tags: ['鐢垫帶', '51鍗曠墖鏈?, 'STM32', 'SW寤烘ā']
      },
      {
        name: '姹甯?,
        role: 'Contributor',
        bio: '鐩墠鍦ㄨ瑙夊矖浣嶏紝鎺㈢储璁＄畻鏈鸿瑙夋妧鏈€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/姹甯?jpg',
        tags: ['瑙嗚', '璁＄畻鏈鸿瑙?, '绠楁硶']
      },
      {
        name: '宀虫坊淇?,
        role: 'Contributor',
        bio: '涓撴敞浜嶤璇█寮€鍙戜笌瀛︿範銆?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/宀虫坊淇?jpg',
        tags: ['C璇█', '缂栫▼', '杞欢寮€鍙?]
      },
      {
        name: '鏉庣晠鐣?,
        role: 'Contributor',
        bio: '璐熻矗鐢垫帶涓庡満鍦扮浉鍏冲伐浣溿€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/鏉庣晠鐣?jpg',
        tags: ['鐢垫帶', '鍦哄湴杩愯惀', '纭欢缁存姢']
      },
      {
        name: '瀛欓洴鑹?,
        role: 'Designer',
        bio: '瀵规満姊版柟闈簡瑙ｈ緝澶氾紝鐔熺粌sw寤烘ā锛屽弬鍔犺繃3d璁捐澶ц禌鍜屽啘涓氭櫤鑳借澶囧ぇ璧涳紝鑷鍗曠墖鏈恒€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/瀛欓洴鑹?jpg',
        tags: ['鏈烘璁捐', 'SW寤烘ā', '3D璁捐', '鍗曠墖鏈?, '鏅鸿兘瑁呭']
      }
    ],
    sponsors: [
      {
        name: '寮€婧愪箣澶?,
        role: 'Gold Sponsor - 楼12,000',
        bio: '涓浗绉戝闄㈣蒋浠剁爺绌舵墍銆佸崕涓烘妧鏈湁闄愬叕鍙搞€佷腑绉戝崡浜蒋浠舵妧鏈爺绌堕櫌鑱斿悎涓诲姙鐨勫紑婧愭椿鍔ㄣ€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/sponsor/寮€婧愪箣澶廘ogo.png',
        tags: ['寮€婧愯蒋浠?, '渚涘簲閾剧偣浜?, '瀛︾敓椤圭洰', '鎶€鏈鍖?, '鍒涙柊鎺ㄥ姩', '浜烘墠鍩瑰吇'],
        github: 'https://summer-ospp.ac.cn/'
      },
      {
        name: '绔嬪垱寮€婧愮‖浠跺钩鍙?,
        role: 'Silver Sponsor - 楼8,000',
        bio: '涓撲笟鐨勫紑婧愮‖浠跺紑鍙戝钩鍙帮紝鎻愪緵涓板瘜鐨勫紑鍙戞澘鍜屾妧鏈祫婧愩€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/sponsor/绔嬪垱寮€婧愬箍鍦?png',
        tags: ['寮€婧愮‖浠?, '寮€鍙戞澘', '鎶€鏈祫婧?, '纭欢寮€鍙?, '鍒涘骞冲彴', '鎶€鏈敮鎸?],
        github: 'https://oshwhub.com/explore'
      },
      // {
      //   name: 'GPUfree 绠楀姏鑷敱',
      //   role: 'Computing Power Partner',
      //   bio: '鎻愪緵1000鍏冪畻鍔涗唬閲戝埜锛屽姪鍔汚I妯″瀷璁粌涓庣鐮旀帰绱€?,
      //   image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/assets/logo_GPU_Free.png',
      //   tags: ['GPU绠楀姏', '鍏嶈垂绠楀姏', 'AI璁粌', '绉戠爺鏀寔', '鍚堜綔浼欎即'],
      //   github: 'https://gpufree.org/'
      // },
      {
        name: 'CubeMars',
        role: 'Motor Partner - 鏃犻檺閲忕數鏈?,
        bio: '涓撲笟鐢垫満瑙ｅ喅鏂规鎻愪緵鍟嗭紝涓烘満鍣ㄤ汉椤圭洰鎻愪緵楂樻€ц兘鐢垫満鏀寔銆?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/sponsor/CubeMars.png',
        tags: ['鐢垫満', '鏃犲埛鐢垫満', '鏈哄櫒浜哄姩鍔?, '楂樻€ц兘鐢垫満', '璧炲姪鍟?]
      },
      {
        name: '钀濆崪灏忛叡',
        role: 'Tool Sponsor - 铻轰笣鍒€',
        bio: '涓撲笟宸ュ叿鍝佺墝锛屼负鍥㈤槦鎻愪緵绮惧瘑铻轰笣鍒€绛夊伐鍏锋敮鎸併€?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/sponsor/钀濆崪灏忛叡.png',
        tags: ['宸ュ叿', '铻轰笣鍒€', '绮惧瘑宸ュ叿', '纭欢缁存姢', '璧炲姪鍟?]
      },
      // {
      //   name: '鑴夊鏅鸿兘',
      //   role: 'RMD鐢垫満1W閲囪喘棰濆害',
      //   bio: '涓撲笟RMD鐢垫満鍙婇┍鍔ㄨВ鍐虫柟妗堟彁渚涘晢锛屾彁渚?涓囧厓鐢垫満閲囪喘棰濆害鏀寔銆?,
      //   image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/sponsor/鑴夊鏅鸿兘绉戞妧.png',
      //   tags: ['RMD鐢垫満', '椹卞姩鍣?, '鐢垫満鎺у埗', '閲囪喘棰濆害', '璧炲姪鍟?]
      // },
      // {
      //   name: '鍗庝负浜?,
      //   role: 'Hardware Sponsor - 棣欐娲惧紑鍙戞澘',
      //   bio: '鍗庝负浜戞彁渚涢姗欐淳寮€鍙戞澘鏀寔锛屽姪鍔涘祵鍏ュ紡寮€鍙戜笌杈圭紭璁＄畻椤圭洰銆?,
      //   image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/sponsor/鍗庝负浜?png',
      //   tags: ['鍗庝负浜?, '棣欐娲?, '寮€鍙戞澘', '宓屽叆寮?, '杈圭紭璁＄畻', '璧炲姪鍟?]
      // },
      {
        name: '鍗庤壓濉戜笟',
        role: 'Hardware Sponsor - 纰崇氦缁村姞宸ユ敮鎸?,
        bio: '鎻愪緵纰崇氦缁村姞宸ユ敮鎸侊紝鍔╁姏鏈哄櫒浜虹粨鏋勪欢鍒朵綔銆?,
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/sponsor/鍗庤壓濉戜笟.png',
        tags: ['浜氬厠鍔?, '缁撴瀯浠?, '鍔犲伐鏀寔', '璧炲姪鍟?],
        github: 'https://m.tb.cn/h.7C6uKBnRQ1NxAMB'
      }
    ]
  },
  cta: {
    title: '鍑嗗濂藉紑濮嬩簡鍚楋紵',
    description: '鍔犲叆鎴戜滑鐨勭ぞ鍖猴紝鍙備笌鍙寔缁妧鏈」鐩?,
    getStarted: '绔嬪嵆寮€濮?
  },
  common: {
    loading: '鍔犺浇涓?..',
    error: '鍑虹幇閿欒',
    success: '鎴愬姛',
    cancel: '鍙栨秷',
    confirm: '纭',
    save: '淇濆瓨',
    edit: '缂栬緫',
    delete: '鍒犻櫎',
    back: '杩斿洖',
    next: '涓嬩竴姝?,
    previous: '涓婁竴姝?
  },
  notFound: {
    title: '椤甸潰鏈壘鍒?,
    description: '鎮ㄥ鎵剧殑椤甸潰涓嶅瓨鍦ㄣ€?,
    returnHome: '杩斿洖棣栭〉'
  },
  projects: {
    title: '鎴戜滑鐨勯」鐩?,
    description: '鎺㈢储涓撴敞浜庡彲鍐嶇敓鑳芥簮鍜屽彲鎸佺画鍙戝睍鐨勫紑婧愰」鐩?,
    filterTitle: '绛涢€夐」鐩?,
    expandFilters: '灞曞紑绛涢€?,
    collapseFilters: '鏀惰捣绛涢€?,
    filterAll: '鍏ㄩ儴',
    filterAI: '浜哄伐鏅鸿兘涓庢満鍣ㄥ涔?,
    filterIoT: '鐗╄仈缃?,
    filterEmbedded: '宓屽叆寮忕郴缁?,
    filterRobotics: '鏈哄櫒浜烘妧鏈?,
    filterResearch: '鐮旂┒',
    filterWeb: 'Web寮€鍙?,
    filterMobile: '绉诲姩搴旂敤',
    filterOther: '鍏朵粬',
    viewProject: '鏌ョ湅椤圭洰',
    viewCode: '鏌ョ湅浠ｇ爜',
    technologies: '鎶€鏈?,
    author: '浣滆€?,
    date: '鏃ユ湡'
  },
  events: {
    title: 'Future / 鏈潵',
    description: '鍙傚姞鎴戜滑鍗冲皢涓捐鐨勫彲鎸佺画鎶€鏈椿鍔ㄥ拰鐮旇浼?,
    filterTitle: '绛涢€夋椿鍔?,
    expandFilters: '灞曞紑绛涢€?,
    collapseFilters: '鏀惰捣绛涢€?,
    upcoming: '鍗冲皢寮€濮?,
    past: '宸茬粨鏉?,
    noUpcoming: '鏆傛棤鍗冲皢寮€濮嬬殑娲诲姩',
    noPast: '鏆傛棤宸茬粨鏉熺殑娲诲姩',
    registerNow: '绔嬪嵆娉ㄥ唽',
    learnMore: '浜嗚В鏇村',
    viewDetails: '鏌ョ湅璇︽儏',
    eventDate: '鏃ユ湡',
    location: '鍦扮偣',
    participants: '鍙備笌鑰?,
    category: '绫诲埆',
    filterAll: '鍏ㄩ儴',
    filterWorkshop: '宸ヤ綔鍧?,
    filterHackathon: '榛戝椹媺鏉?,
    filterSeminar: '鐮旇浼?,
    filterCompetition: '绔炶禌',
    filterNetworking: '缃戠粶娲诲姩'
  },
  resources: {
    title: '瀛︿範璧勬簮',
    description: '鑾峰彇鍙寔缁妧鏈紑鍙戠殑绮鹃€夎祫婧?,
    filterTitle: '绛涢€夎祫婧?,
    expandFilters: '灞曞紑绛涢€?,
    collapseFilters: '鏀惰捣绛涢€?,
    searchPlaceholder: '鎼滅储璧勬簮...',
    filterAll: '鍏ㄩ儴',
    filterTutorials: '鏁欑▼',
    filterTools: '宸ュ叿',
    filterBooks: '涔︾睄',
    filterCourses: '璇剧▼',
    filterDocumentation: '鏂囨。',
    noResults: '鏈壘鍒拌祫婧?,
    viewResource: '鏌ョ湅璧勬簮',
    downloadResource: '涓嬭浇',
    freeResource: '鍏嶈垂',
    paidResource: '浠樿垂',
    difficulty: '闅惧害',
    beginner: '鍒濈骇',
    intermediate: '涓骇',
    advanced: '楂樼骇',
    category: '绫诲埆',
    author: '浣滆€?,
    rating: '璇勫垎',
    sortBy: '鎺掑簭鏂瑰紡',
    sortOrder: '鎺掑簭',
    sortByRating: '璇勫垎',
    sortByTitle: '鏍囬',
    sortByDifficulty: '闅惧害',
    sortByType: '绫诲瀷',
    ascending: '鍗囧簭',
    descending: '闄嶅簭',
    totalResources: '鍏?{count} 涓祫婧?
  },
  contact: {
    title: '鑱旂郴鎴戜滑',
    description: '濡傛湁鐤戦棶銆佸悎浣滄垨浼欎即鍏崇郴锛岃涓庢垜浠殑鍥㈤槦鑱旂郴',
    getInTouch: '鑱旂郴鎴戜滑',
    contactInfo: '鑱旂郴淇℃伅',
    followUs: '鍏虫敞鎴戜滑',
    channelsDescription: '鎮ㄤ篃鍙互閫氳繃浠ヤ笅鏂瑰紡涓庢垜浠彇寰楄仈绯汇€?,
    followUsDescription: '鍦ㄧぞ浜ゅ钩鍙板叧娉ㄦ垜浠紝鑾峰彇鏈€鏂板姩鎬佷笌鏂伴椈銆?,
    form: {
      name: '濮撳悕',
      email: '閭',
      subject: '涓婚',
      message: '娑堟伅',
      namePlaceholder: '鎮ㄧ殑濮撳悕',
      emailPlaceholder: 'your.email@example.com',
      subjectPlaceholder: '鎴戜滑濡備綍甯姪鎮紵',
      messagePlaceholder: '璇疯缁嗚鏄庢偍鐨勮闂?..',
      sendMessage: '鍙戦€佹秷鎭?,
      sending: '鍙戦€佷腑...',
      messageSent: '娑堟伅鍙戦€佹垚鍔燂紒',
      messageError: '鍙戦€佹秷鎭け璐ャ€傝閲嶈瘯銆?,
      introText: '璇峰～鍐欎笅鏂硅〃鍗曪紝鎴戜滑浼氬敖蹇笌鎮ㄨ仈绯汇€?,
      toastSuccessDescription: '鎴戜滑浼氬敖蹇笌鎮ㄥ彇寰楄仈绯汇€?,
      toastErrorDescription: '璇锋鏌ユ偍鐨勭綉缁滆繛鎺ュ苟閲嶈瘯銆?
    },
    info: {
      address: '鏂板寳鍖鸿窘娌宠矾666鍙凤紝涓滀竴闂紝鐜夎　妤?A416',
      phone: '+86 158 9600 0818',
      email: '22230635@czu.cn',
      hours: '鍛ㄤ竴鑷冲懆浜旓細涓婂崍9鐐?- 涓嬪崍6鐐?
    },
    infoLabels: {
      address: '鍦板潃',
      phone: '鐢佃瘽',
      email: '閭',
      hours: '鍔炲叕鏃堕棿'
    },
    social: {
      gitee: 'Gitee',
      wechat: '寰俊',
      email: '閭'
    },
    application: {
      title: 'NEC瀹樼綉涓婄嚎鐢宠',
      description: '鐢宠鍔犲叆NEC瀹樼綉锛屽睍绀烘偍鐨勯」鐩笌鎴愭灉銆?,
      applyNow: '绔嬪嵆鐢宠'
    }
  },
  dashboard: {
    title: '鎺у埗鍙?,
    welcome: '娆㈣繋鍥炴潵锛?,
    memberSince: '浼氬憳鑷?,
    logout: '閫€鍑?,
    myProjects: {
      title: '鎴戠殑椤圭洰',
      description: '绠＄悊鍜岃窡韪偍瀵规垜浠紑婧愰」鐩殑璐＄尞',
      noProjects: '鏆傛棤椤圭洰',
      viewGithub: '鏌ョ湅Gitee'
    },
    upcomingEvents: {
      title: '鍗冲皢寮€濮嬬殑娲诲姩',
      description: '鍙婃椂浜嗚В鍗冲皢寮€濮嬬殑宸ヤ綔鍧婂拰娲诲姩',
      noEvents: '鏆傛棤鍗冲皢寮€濮嬬殑娲诲姩',
      viewAll: '鏌ョ湅鎵€鏈夋椿鍔?
    },
    myActivity: {
      title: '鎴戠殑娲诲姩',
      description: '璺熻釜鎮ㄧ殑璐＄尞鍜岀ぞ鍖哄弬涓庡害',
      contributions: '璐＄尞',
      eventsAttended: '鍙傚姞鐨勬椿鍔?,
      projectsCompleted: '瀹屾垚鐨勯」鐩?
    },
    quickActions: {
      title: '蹇嵎鎿嶄綔',
      submitProject: '鎻愪氦鏂伴」鐩?,
      registerEvent: '娉ㄥ唽娲诲姩',
      viewResources: '鏌ョ湅璧勬簮',
      contactUs: '鑱旂郴鎴戜滑'
    }
  },
  footer: {
    clubName: 'NEC鏂拌兘婧愬紑鍙戣€呯ぞ鍖?,
    description: '閫氳繃鍗忎綔寮€鍙戞瀯寤哄彲鎸佺画鎶€鏈?,
    navigation: '瀵艰埅',
    resources: '璧勬簮',
    contact: '鑱旂郴',
    learningMaterials: '瀛︿範璧勬枡',
    joinClub: '鍔犲叆NEC浠撳簱瀹為獙瀹?,
    gettingStarted: '鍏ラ棬鏂囨。',
    techRoadmap: {
      title: '鎶€鏈矾绾?,
      description: '涓撲笟鐨勬妧鏈彂灞曟寚瀵?
    },
    address: '姹熻嫃鐪佸父宸炲競鏂板寳鍖鸿窘娌宠矾666鍙峰父宸炲伐瀛﹂櫌杈芥渤璺牎鍖虹帀琛416浠撳簱瀹為獙瀹?,
    copyright: '漏 2025 NEC鏂拌兘婧愬紑鍙戣€呯ぞ鍖恒€備繚鐣欐墍鏈夋潈鍒┿€?
  },
  displayRatio: {
    title: '鏄剧ず姣斾緥璋冩暣鍣?,
    description: '璋冩暣鍗＄墖鏄剧ず姣斾緥锛屾煡鐪嬩笉鍚屾瘮渚嬩笅鐨勮瑙夋晥鏋?,
    aspectRatioLabel: '鏄剧ず姣斾緥',
    viewDetails: '鏌ョ湅璇︽儏',
    noMatchingContent: '娌℃湁鎵惧埌鍖归厤鐨勫唴瀹?,
    aspectRatios: {
      square: '姝ｆ柟褰?(1:1)',
      video: '瑙嗛姣斾緥 (16:9)',
      traditional: '浼犵粺姣斾緥 (4:3)',
      portrait: '绔栫洿姣斾緥 (3:4)',
      widescreen: '瀹藉睆姣斾緥 (16:10)',
      ultrawide: '瓒呭姣斾緥 (21:9)'
    }
  },
  // Getting Started 椤甸潰缈昏瘧
  gettingStarted: {
    hero: {
      title: '鏂拌兘婧愮紪绋嬩勘涔愰儴',
      description: '鎺㈢储鏂拌兘婧愭妧鏈殑鏃犻檺鍙兘锛屼粠缂栫▼寮€濮嬫敼鍙樹笘鐣?,
      buttons: {
        joinClub: '鍔犲叆淇变箰閮?,
        viewProjects: '鏌ョ湅椤圭洰',
        visitSite: '璁块棶瀹樼綉'
      }
    },
    stats: {
      learnersTitle: '瀛︿範鑰?,
      learnersDesc: '娲昏穬瀛︿範鑰?,
      completedProjectsTitle: '瀹屾垚椤圭洰',
      completedProjectsDesc: '椤圭洰瀹屾垚鏁?,
      averageRatingTitle: '骞冲潎璇勫垎',
      averageRatingDesc: '瀛﹀憳婊℃剰搴?,
      successRateTitle: '鎴愬姛鐜?,
      successRateDesc: '瀛︿範鎴愬姛鐜?
    },
    directions: {
      title: '閫夋嫨浣犵殑鎶€鏈柟鍚?,
      description: '鏍规嵁浣犵殑鍏磋叮鍜岃亴涓氳鍒掞紝閫夋嫨鏈€閫傚悎鐨勫涔犺矾寰?,
      coreSkills: '鏍稿績鎶€鑳?,
      projectsSuffix: '涓」鐩?,
      startLearning: '寮€濮嬪涔?,
      embedded: {
        title: '宓屽叆寮忓紑鍙?,
        description: '瀛︿範宓屽叆寮忕郴缁熷紑鍙戯紝鎺屾彙纭欢涓庤蒋浠剁粨鍚堢殑鏍稿績鎶€鏈?,
        skills: ['C/C++', 'FreeRTOS', '纭欢璋冭瘯', '閫氫俊鍗忚'],
        duration: '6-8涓湀'
      },
      gui: {
        title: 'GUI鐣岄潰寮€鍙?,
        description: '鎺屾彙璺ㄥ钩鍙板浘褰㈢晫闈㈠紑鍙戯紝鍒涘缓缇庤瀹炵敤鐨勬闈㈠簲鐢?,
        skills: ['Qt/QML', 'UI璁捐', '璺ㄥ钩鍙板紑鍙?, '鐢ㄦ埛浣撻獙'],
        duration: '4-6涓湀'
      },
      algorithm: {
        title: '绠楁硶涓庢暟鎹粨鏋?,
        description: '娣卞叆瀛︿範绠楁硶璁捐涓庝紭鍖栵紝鎻愬崌缂栫▼鎬濈淮鍜岃В鍐抽棶棰樼殑鑳藉姏',
        skills: ['绠楁硶璁捐', '鏁版嵁缁撴瀯', '鎬ц兘浼樺寲', '鏁板寤烘ā'],
        duration: '8-12涓湀'
      },
      structurePrint: {
        title: '缁撴瀯鎵撳嵃寮€鍙?,
        description: '闈㈠悜3D缁撴瀯鎵撳嵃鐨勮璁°€佸垏鐗囦笌鎺у埗寮€鍙?,
        skills: ['CAD寤烘ā', '鍒囩墖杞欢', '鏉愭枡宸ヨ壓', 'G-code/鎺у埗'],
        duration: '5-7涓湀'
      }
    },
    quickGuides: {
      title: '蹇€熶笂鎵嬫寚鍗?,
      description: '璺熼殢鎴戜滑鐨勬寚鍗楋紝蹇€熷紑濮嬩綘鐨勬柊鑳芥簮缂栫▼涔嬫梾',
      stepsLabel: '姝ラ锛?,
      items: {
        setup: {
          title: '鐜鎼缓',
          description: '蹇€熸惌寤哄紑鍙戠幆澧冿紝寮€濮嬩綘鐨勭紪绋嬩箣鏃?,
          steps: [
            '閫夋嫨閫傚悎鐨勫紑鍙戝伐鍏?,
            '瀹夎蹇呰鐨勮蒋浠跺寘',
            '閰嶇疆寮€鍙戠幆澧?,
            '杩愯绗竴涓▼搴?
          ],
          estimatedTime: '30鍒嗛挓'
        },
        firstGoodIssue: {
          title: '绗竴涓ソ鐨勯棶棰?,
          description: '瀵绘壘骞惰В鍐充綘鐨勭涓€涓狦ood Issue锛屽紑濮嬩负寮€婧愰」鐩仛璐＄尞',
          steps: [
            '娴忚椤圭洰Issue鍒楄〃',
            '绛涢€塆ood First Issue鏍囩',
            '鐞嗚В闂鎻忚堪鍜岃姹?,
            'Fork椤圭洰骞跺垱寤哄垎鏀?,
            '瀹炵幇瑙ｅ喅鏂规',
            '鎻愪氦Pull Request'
          ],
          estimatedTime: '25鍒嗛挓'
        },
        firstProject: {
          title: '绗竴涓」鐩?,
          description: '閫氳繃瀹為檯椤圭洰蹇€熶笂鎵嬶紝鎺屾彙鍩虹寮€鍙戞祦绋?,
          steps: [
            '閫夋嫨鍏ラ棬椤圭洰',
            '鐞嗚В椤圭洰缁撴瀯',
            '缂栧啓鏍稿績浠ｇ爜',
            '娴嬭瘯鍜岃皟璇?,
            '椤圭洰閮ㄧ讲'
          ],
          estimatedTime: '2灏忔椂'
        },
        community: {
          title: '鍔犲叆绀惧尯',
          description: '铻嶅叆瀛︿範绀惧尯锛岃幏寰楁洿澶氭敮鎸佸拰浜ゆ祦鏈轰細',
          steps: [
            '娉ㄥ唽淇变箰閮ㄨ处鍙?,
            '瀹屽杽涓汉璧勬枡',
            '鍔犲叆瀛︿範灏忕粍',
            '鍙備笌璁ㄨ浜ゆ祦'
          ],
          estimatedTime: '15鍒嗛挓'
        }
      }
    },
    baseTutorials: {
      title: '鍩虹鏁欑▼',
      description: '浠庨浂寮€濮嬪涔犵紪绋嬪熀纭€鐭ヨ瘑鍜屾牳蹇冩蹇?,
      introTitle: '缂栫▼鍏ラ棬',
      introDesc: '缂栫▼鍩虹姒傚康鍜屾€濈淮鏂瑰紡锛屼簡瑙ｆ柊鑳芥簮缂栫▼鐨勫簲鐢ㄩ鍩熷拰鍙戝睍鍓嶆櫙',
      fundamentalsTitle: '缂栫▼鍩虹',
      fundamentalsDesc: '鍙橀噺銆佸嚱鏁般€佹帶鍒剁粨鏋勭瓑鍩虹鐭ヨ瘑锛屾帉鎻＄紪绋嬬殑鏍稿績姒傚康鍜岃娉?,
      startLearning: '寮€濮嬪涔?
    },
    trainingResources: {
      title: '鍩硅璧勬簮',
      description: '涓板瘜鐨勫涔犺祫婧愶紝鍔╀綘蹇€熸彁鍗囨妧鑳?,
      githubRepoTitle: 'GitHub 浠撳簱',
      githubRepoDesc: '鏌ョ湅椤圭洰婧愮爜鍜岃础鐚唬鐮?,
      visitGithub: '璁块棶 GitHub',
      docsTitle: '鎶€鏈枃妗?,
      docsDesc: '璇︾粏鐨勬妧鏈枃妗ｅ拰API鍙傝€?,
      viewDocs: '鏌ョ湅鏂囨。',
      videosTitle: '瑙嗛鏁欑▼',
      videosDesc: '瑙傜湅瀹炴垬椤圭洰瑙嗛鏁欑▼',
      watchVideos: '瑙傜湅瑙嗛',
      communityTitle: '绀惧尯浜ゆ祦',
      communityDesc: '鍔犲叆绀惧尯璁ㄨ鍜屼氦娴?,
      joinDiscussion: '鍔犲叆璁ㄨ'
    }
  },
  // 瀛︿範璺緞鍜屾妧鏈矾绾跨炕璇?
  learning: learningTranslations.zh
};
