import Md5 from "@utils/md5.min.js";

export const getAvatar = ( email, avatar ) => {
    const playerAvatarSrc = ! avatar && email
    ? 'http://gravatar.com/avatar/' + Md5(email) + '.jpg'
    : avatar;

    return playerAvatarSrc;
}
