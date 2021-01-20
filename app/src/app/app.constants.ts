export class Constants {
  // public static API_BASE_URL = 'https://wsgap2.redsos.com.ar/api'; // Cloud Diproach
  // public static FILES_BASE_URL = 'https://vps-1060583-x.dattaweb.com:4076/files'; // Cloud Diproach
  // public static API_METHOD_FILE_UPLOAD  = '/files/upload';

  public static DEFAULT_AVATAR_NO_IMAGE = 'assets/imgs/avatar.png';

  public static API_METHODS = {
    accounts: '/accounts',
    actualStatus: '/estadoActual',
    status: '/estados',
    moviles: '/moviles',
    services: '/Servicios/api/servicios/',
    reject: '/motivosRechazos',
    files: '/files'
  };

  public static storage = {
    accessToken: 'accessToken',
    user: 'user_SOS',
  };

}
