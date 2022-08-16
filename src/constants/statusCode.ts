export enum STATUSCODE {
    USER_NOT_FOUND_400 = 40000,
    USER_UPDATE_SUCCESS_402 = 40002,
    USER_CREATE_FAIL_404 = 40004,
    USER_READ_SUCCESS_407 = 40007,
    USER_LIST_SUCESS_409 = 40009,
    PHONE_UPDATE_SUCCESS_4011 = 40011,
    PHONE_NOTFOUND_4012 = 40012,
    USER_AVATAR_UPLOADED_4013 = 40013,
    PHONE_IS_NEW_801 = 80001,
    REGISTED_FAILED_802 = 80002,
    PHONE_USED_ANOTHER_DEVICE_803 = 80003,
    PHONE_USED_OLD_DEVICE_804 = 80004,
    REGISTER_SOCIAL_SUCCESS_805 = 80005,
    REGISTER_SUCCESS_806 = 80006,
    REGISTER_IN_NEW_DEVICE_807 = 80007,
    NOTFOUND_PHONE_OR_MAC_810 = 80010,
    REINSTALL_SUCCESS_811 = 80011,
    VIDEO_LIKE_SUCCESS_901 = 90001,
    VIDEO_ALREADY_LIKE_902 = 90002,
    VIDEO_UNLIKE_SUCCESS = 90003,
    VIDEO_ALREADY_UNLIKE_904 = 90004,
    VIDEO_UNLIKE_NOT_EXIST_907 = 90007,
    VIDEO_LIKE_NOT_EXIST_909 = 90009,
    GAME_NOT_FOUND_500 = 50000,
    GAME_CREATE_SUCCESS_501 = 50001,
    GAME_UPDATE_SUCCESS_502 = 50002,
    GAME_CREATE_FAIL_504 = 50004,
}