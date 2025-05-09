interface Translation {
  common: {
    download: string;
    paste: string;
    loading: string;
    error: string;
    success: string;
    invalidUrl: string;
    downloadFailed: string;
    tryAgain: string;
    selectFormat: string;
    downloadNow: string;
    poweredBy: string;
  };
  tools: {
    youtube: {
      title: string;
      description: string;
      mp4: string;
      mp3: string;
      seoTitle: string;
      seoDescription: string;
    };
    facebook: {
      title: string;
      description: string;
      seoTitle: string;
      seoDescription: string;
    };
    tiktok: {
      title: string;
      description: string;
      seoTitle: string;
      seoDescription: string;
    };
    instagram: {
      title: string;
      description: string;
      seoTitle: string;
      seoDescription: string;
    };
    twitter: {
      title: string;
      description: string;
      seoTitle: string;
      seoDescription: string;
    };
    reddit: {
      title: string;
      description: string;
      seoTitle: string;
      seoDescription: string;
    };
    pinterest: {
      title: string;
      description: string;
      seoTitle: string;
      seoDescription: string;
    };
    urlShortener: {
      title: string;
      description: string;
      seoTitle: string;
      seoDescription: string;
      formTitle: string;
      formDescription: string;
      urlLabel: string;
      urlPlaceholder: string;
      customAliasLabel: string;
      customAliasPlaceholder: string;
      optional: string;
      shortenButton: string;
      shortening: string;
      success: string;
      copyToClipboard: string;
      openInNewTab: string;
      copied: string;
      howItWorksTitle: string;
      step1Title: string;
      step1Description: string;
      step2Title: string;
      step2Description: string;
      step3Title: string;
      step3Description: string;
      errors: {
        emptyUrl: string;
        invalidUrl: string;
        generic: string;
      };
    };
  };
  pages: {
    home: {
      title: string;
      description: string;
      welcome: string;
      subtitle: string;
      seoTitle: string;
      seoDescription: string;
    };
    privacy: {
      title: string;
      description: string;
    };
    terms: {
      title: string;
      description: string;
    };
    contact: {
      title: string;
      description: string;
    };
    error: {
      notFound: string;
      serverError: string;
      backHome: string;
    };
  };
  admin: {
    login: {
      title: string;
      username: string;
      password: string;
      loginButton: string;
      error: string;
    };
    dashboard: {
      title: string;
      welcome: string;
      messagesCount: string;
      cookiesCount: string;
      viewMessages: string;
      manageCookies: string;
      logout: string;
    };
    messages: {
      title: string;
      fetchError: string;
      markReadError: string;
      unknownError: string;
      noMessages: string;
      noMessagesDescription: string;
      new: string;
      markAsRead: string;
    };
    cookies: {
      title: string;
      fetchError: string;
      uploadError: string;
      deleteError: string;
      unknownError: string;
      noCookies: string;
      noCookiesDescription: string;
      platform: string;
      uploadDate: string;
      status: string;
      actions: string;
      active: string;
      inactive: string;
      delete: string;
      toggleStatus: string;
      uploadTitle: string;
      uploadDescription: string;
      selectPlatform: string;
      selectFile: string;
      uploadButton: string;
      uploading: string;
    };
    common: {
      backToDashboard: string;
      loading: string;
    };
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
  };
}

export const translations: Record<string, Translation> = {
  en: {
    common: {
      download: "Download",
      paste: "Paste URL",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      invalidUrl: "Invalid URL",
      downloadFailed: "Download failed",
      tryAgain: "Please try again",
      selectFormat: "Select format",
      downloadNow: "Download Now",
      poweredBy: "Powered by Bat Systems"
    },
    tools: {
      youtube: {
        title: "YouTube Downloader",
        description: "Download videos from YouTube in MP4 or MP3 format",
        mp4: "Video (MP4)",
        mp3: "Audio (MP3)",
        seoTitle: "Free YouTube Video Downloader – Online HD & MP3",
        seoDescription: "Download YouTube videos in HD or MP3 for free. Fast, online, no installation."
      },
      facebook: {
        title: "Facebook Downloader",
        description: "Download videos from Facebook",
        seoTitle: "Facebook Video Downloader – Online, HD, Free",
        seoDescription: "Download Facebook videos instantly in HD format. No app required."
      },
      tiktok: {
        title: "TikTok Downloader",
        description: "Download TikTok videos without watermark",
        seoTitle: "Download TikTok Videos Without Watermark – Fast & Free",
        seoDescription: "Save TikTok videos without watermark. No login. No app. 100% free."
      },
      instagram: {
        title: "Instagram Downloader",
        description: "Download videos from Instagram",
        seoTitle: "Download Instagram Photos & Videos – Free",
        seoDescription: "Save Reels, Stories, IGTV videos fast and online."
      },
      twitter: {
        title: "Twitter Downloader",
        description: "Download videos from Twitter",
        seoTitle: "Twitter Video Downloader – Save Videos & GIFs",
        seoDescription: "Download Twitter videos and GIFs in high quality. Fast and free."
      },
      reddit: {
        title: "Reddit Downloader",
        description: "Download videos from Reddit",
        seoTitle: "Reddit Video Downloader – With Sound, HD Quality",
        seoDescription: "Download Reddit videos with sound. No watermark, high quality."
      },
      pinterest: {
        title: "Pinterest Downloader",
        description: "Download videos from Pinterest",
        seoTitle: "Pinterest Video & Image Downloader – Free Online Tool",
        seoDescription: "Save Pinterest videos, images, and GIFs easily. No login required."
      },
      urlShortener: {
        title: "URL Shortener",
        description: "Shorten long URLs into compact links",
        seoTitle: "Free URL Shortener – Create Short Links Instantly",
        seoDescription: "Shorten long URLs into compact, easy-to-share links. Free, fast, and no registration required.",
        formTitle: "Shorten Your URL",
        formDescription: "Enter a long URL to create a short, easy-to-share link",
        urlLabel: "Long URL",
        urlPlaceholder: "https://example.com/very/long/url/that/needs/shortening",
        customAliasLabel: "Custom Alias",
        customAliasPlaceholder: "my-custom-link",
        optional: "optional",
        shortenButton: "Shorten URL",
        shortening: "Shortening...",
        success: "Your shortened URL is ready!",
        copyToClipboard: "Copy to clipboard",
        openInNewTab: "Open in new tab",
        copied: "Copied to clipboard!",
        howItWorksTitle: "How It Works",
        step1Title: "Paste Your URL",
        step1Description: "Enter the long URL you want to shorten",
        step2Title: "Create Short Link",
        step2Description: "Click the Shorten button to generate your short URL",
        step3Title: "Share Anywhere",
        step3Description: "Copy and share your shortened URL with anyone",
        errors: {
          emptyUrl: "Please enter a URL to shorten",
          invalidUrl: "Please enter a valid URL",
          generic: "An error occurred. Please try again."
        }
      }
    },
    pages: {
      home: {
        title: "Online Tools Hub - Free Online Utilities",
        description: "A collection of free online tools for downloading videos from popular social media platforms",
        welcome: "Welcome to Online Tools Hub",
        subtitle: "Free online tools for downloading videos from popular social media platforms",
        seoTitle: "Online Tools Hub – All-in-One Downloader Tools (YouTube, TikTok, etc.)",
        seoDescription: "Free download tools for YouTube, TikTok, Facebook, Instagram and more. Fast, clean, and watermark-free."
      },
      privacy: {
        title: "Privacy Policy",
        description: "Privacy Policy for Online Tools Hub"
      },
      terms: {
        title: "Terms of Service",
        description: "Terms of Service for Online Tools Hub"
      },
      contact: {
        title: "Contact Us",
        description: "Contact Online Tools Hub"
      },
      error: {
        notFound: "Page not found",
        serverError: "Server error",
        backHome: "Back to home"
      }
    },
    admin: {
      login: {
        title: "Admin Login",
        username: "Username",
        password: "Password",
        loginButton: "Login",
        error: "Invalid username or password"
      },
      dashboard: {
        title: "Admin Dashboard",
        welcome: "Welcome to the Admin Dashboard",
        messagesCount: "Contact Messages",
        cookiesCount: "Cookie Files",
        viewMessages: "View Messages",
        manageCookies: "Manage Cookies",
        logout: "Logout"
      },
      messages: {
        title: "Contact Messages",
        fetchError: "Failed to fetch messages",
        markReadError: "Failed to mark message as read",
        unknownError: "An unknown error occurred",
        noMessages: "No Messages",
        noMessagesDescription: "You don't have any contact messages yet",
        new: "New",
        markAsRead: "Mark as read"
      },
      cookies: {
        title: "Cookie Management",
        fetchError: "Failed to fetch cookies",
        uploadError: "Failed to upload cookie file",
        deleteError: "Failed to delete cookie file",
        unknownError: "An unknown error occurred",
        noCookies: "No Cookie Files",
        noCookiesDescription: "You haven't uploaded any cookie files yet",
        platform: "Platform",
        uploadDate: "Upload Date",
        status: "Status",
        actions: "Actions",
        active: "Active",
        inactive: "Inactive",
        delete: "Delete",
        toggleStatus: "Toggle Status",
        uploadTitle: "Upload Cookie File",
        uploadDescription: "Upload a cookie file for YouTube or TikTok authentication",
        selectPlatform: "Select Platform",
        selectFile: "Select File",
        uploadButton: "Upload",
        uploading: "Uploading..."
      },
      common: {
        backToDashboard: "Back to Dashboard",
        loading: "Loading..."
      }
    },
    seo: {
      defaultTitle: "Online Tools Hub – All-in-One Downloader Tools (YouTube, TikTok, etc.)",
      defaultDescription: "Free download tools for YouTube, TikTok, Facebook, Instagram and more. Fast, clean, and watermark-free."
    }
  },
  ar: {
    common: {
      download: "تحميل",
      paste: "الصق الرابط",
      loading: "جاري التحميل...",
      error: "خطأ",
      success: "نجاح",
      invalidUrl: "رابط غير صالح",
      downloadFailed: "فشل التحميل",
      tryAgain: "يرجى المحاولة مرة أخرى",
      selectFormat: "اختر الصيغة",
      downloadNow: "تحميل الآن",
      poweredBy: "مدعوم من Bat Systems"
    },
    tools: {
      youtube: {
        title: "تحميل فيديوهات يوتيوب",
        description: "تحميل فيديوهات من يوتيوب بصيغة MP4 أو MP3",
        mp4: "فيديو (MP4)",
        mp3: "صوت (MP3)",
        seoTitle: "تحميل فيديوهات يوتيوب مجانًا بجودة عالية وصوت MP3",
        seoDescription: "تحميل فيديوهات يوتيوب بجودة عالية أو MP3 مجانًا. سريع، أونلاين، بدون تثبيت."
      },
      facebook: {
        title: "تحميل فيديوهات فيسبوك",
        description: "تحميل فيديوهات من فيسبوك",
        seoTitle: "تحميل فيديو من فيسبوك – أونلاين وبجودة عالية",
        seoDescription: "تحميل فيديوهات فيسبوك فوراً بجودة عالية. لا يتطلب تطبيق."
      },
      tiktok: {
        title: "تحميل فيديوهات تيك توك",
        description: "تحميل فيديوهات تيك توك بدون علامة مائية",
        seoTitle: "تحميل فيديوهات تيك توك بدون علامة مائية – مجانًا",
        seoDescription: "حفظ فيديوهات تيك توك بدون علامة مائية. بدون تسجيل دخول. بدون تطبيق. مجاني 100%."
      },
      instagram: {
        title: "تحميل فيديوهات انستغرام",
        description: "تحميل فيديوهات من انستغرام",
        seoTitle: "تحميل صور وفيديوهات انستغرام – مجانًا",
        seoDescription: "حفظ الريلز والقصص وفيديوهات IGTV بسرعة وأونلاين."
      },
      twitter: {
        title: "تحميل فيديوهات تويتر",
        description: "تحميل فيديوهات من تويتر",
        seoTitle: "تحميل فيديوهات تويتر – حفظ الفيديوهات والصور المتحركة",
        seoDescription: "تحميل فيديوهات وصور متحركة من تويتر بجودة عالية. سريع ومجاني."
      },
      reddit: {
        title: "تحميل فيديوهات ريديت",
        description: "تحميل فيديوهات من ريديت",
        seoTitle: "تحميل فيديوهات ريديت – مع الصوت، جودة عالية",
        seoDescription: "تحميل فيديوهات ريديت مع الصوت. بدون علامة مائية، جودة عالية."
      },
      pinterest: {
        title: "تحميل فيديوهات بينتريست",
        description: "تحميل فيديوهات من بينتريست",
        seoTitle: "تحميل فيديوهات وصور بينتريست – أداة مجانية عبر الإنترنت",
        seoDescription: "حفظ فيديوهات وصور وصور متحركة من بينتريست بسهولة. لا يتطلب تسجيل دخول."
      },
      urlShortener: {
        title: "اختصار الروابط",
        description: "اختصار الروابط الطويلة إلى روابط قصيرة",
        seoTitle: "اختصار روابط مجاني – إنشاء روابط قصيرة فوراً",
        seoDescription: "اختصار الروابط الطويلة إلى روابط قصيرة سهلة المشاركة. مجاني، سريع، ولا يتطلب تسجيل.",
        formTitle: "اختصار الرابط",
        formDescription: "أدخل رابطًا طويلًا لإنشاء رابط قصير سهل المشاركة",
        urlLabel: "الرابط الطويل",
        urlPlaceholder: "https://example.com/رابط/طويل/جدا/يحتاج/إلى/اختصار",
        customAliasLabel: "اسم مخصص",
        customAliasPlaceholder: "رابطي-المخصص",
        optional: "اختياري",
        shortenButton: "اختصار الرابط",
        shortening: "جاري الاختصار...",
        success: "تم إنشاء الرابط المختصر!",
        copyToClipboard: "نسخ إلى الحافظة",
        openInNewTab: "فتح في تبويب جديد",
        copied: "تم النسخ إلى الحافظة!",
        howItWorksTitle: "كيف يعمل",
        step1Title: "الصق الرابط",
        step1Description: "أدخل الرابط الطويل الذي تريد اختصاره",
        step2Title: "إنشاء رابط قصير",
        step2Description: "انقر على زر الاختصار لإنشاء رابط قصير",
        step3Title: "شارك في أي مكان",
        step3Description: "انسخ وشارك الرابط المختصر مع أي شخص",
        errors: {
          emptyUrl: "يرجى إدخال رابط لاختصاره",
          invalidUrl: "يرجى إدخال رابط صالح",
          generic: "حدث خطأ. يرجى المحاولة مرة أخرى."
        }
      }
    },
    pages: {
      home: {
        title: "مركز الأدوات عبر الإنترنت - أدوات مجانية عبر الإنترنت",
        description: "مجموعة من الأدوات المجانية عبر الإنترنت لتحميل الفيديوهات من منصات التواصل الاجتماعي الشهيرة",
        welcome: "مرحبًا بك في مركز الأدوات عبر الإنترنت",
        subtitle: "أدوات مجانية عبر الإنترنت لتحميل الفيديوهات من منصات التواصل الاجتماعي الشهيرة",
        seoTitle: "مركز الأدوات – تحميل فيديوهات واختصار روابط مجانًا",
        seoDescription: "أدوات تحميل الفيديو من كل المنصات – يوتيوب، تيك توك، فيسبوك، وانستقرام. بدون برامج وبدون علامة مائية."
      },
      privacy: {
        title: "سياسة الخصوصية",
        description: "سياسة الخصوصية لمركز الأدوات عبر الإنترنت"
      },
      terms: {
        title: "شروط الخدمة",
        description: "شروط الخدمة لمركز الأدوات عبر الإنترنت"
      },
      contact: {
        title: "اتصل بنا",
        description: "اتصل بمركز الأدوات عبر الإنترنت"
      },
      error: {
        notFound: "الصفحة غير موجودة",
        serverError: "خطأ في الخادم",
        backHome: "العودة إلى الصفحة الرئيسية"
      }
    },
    admin: {
      login: {
        title: "تسجيل دخول المشرف",
        username: "اسم المستخدم",
        password: "كلمة المرور",
        loginButton: "تسجيل الدخول",
        error: "اسم المستخدم أو كلمة المرور غير صحيحة"
      },
      dashboard: {
        title: "لوحة تحكم المشرف",
        welcome: "مرحبًا بك في لوحة تحكم المشرف",
        messagesCount: "رسائل الاتصال",
        cookiesCount: "ملفات الكوكيز",
        viewMessages: "عرض الرسائل",
        manageCookies: "إدارة الكوكيز",
        logout: "تسجيل الخروج"
      },
      messages: {
        title: "رسائل الاتصال",
        fetchError: "فشل في جلب الرسائل",
        markReadError: "فشل في تحديد الرسالة كمقروءة",
        unknownError: "حدث خطأ غير معروف",
        noMessages: "لا توجد رسائل",
        noMessagesDescription: "ليس لديك أي رسائل اتصال حتى الآن",
        new: "جديد",
        markAsRead: "تحديد كمقروءة"
      },
      cookies: {
        title: "إدارة الكوكيز",
        fetchError: "فشل في جلب ملفات الكوكيز",
        uploadError: "فشل في رفع ملف الكوكيز",
        deleteError: "فشل في حذف ملف الكوكيز",
        unknownError: "حدث خطأ غير معروف",
        noCookies: "لا توجد ملفات كوكيز",
        noCookiesDescription: "لم تقم برفع أي ملفات كوكيز حتى الآن",
        platform: "المنصة",
        uploadDate: "تاريخ الرفع",
        status: "الحالة",
        actions: "الإجراءات",
        active: "نشط",
        inactive: "غير نشط",
        delete: "حذف",
        toggleStatus: "تبديل الحالة",
        uploadTitle: "رفع ملف كوكيز",
        uploadDescription: "رفع ملف كوكيز للمصادقة على يوتيوب أو تيك توك",
        selectPlatform: "اختر المنصة",
        selectFile: "اختر الملف",
        uploadButton: "رفع",
        uploading: "جاري الرفع..."
      },
      common: {
        backToDashboard: "العودة إلى لوحة التحكم",
        loading: "جاري التحميل..."
      }
    },
    seo: {
      defaultTitle: "مركز الأدوات – تحميل فيديوهات واختصار روابط مجانًا",
      defaultDescription: "أدوات تحميل الفيديو من كل المنصات – يوتيوب، تيك توك، فيسبوك، وانستقرام. بدون برامج وبدون علامة مائية."
    }
  }
};
