export class Settings {

  // Global Settings
  public static APP_NAME = 'GAP 3.0';
  public static imei = '353108087651281';

  // Servicios
  public static greetings = {
    morning: {
      from: '06:00',
      text: 'Buenos Días',
      image: '../assets/imgs/buen-dia.svg'
    },
    afternoon: {
      from: '13:00',
      text: 'Buenas Tardes',
      image: '../assets/imgs/buenas-tardes.svg'
    },
    night: {
      from: '20:00',
      text: 'Buenas Noches',
      image: '../assets/imgs/buenas-noches.svg'
    }
  };

  // Servicios
  public static servicioAcciones = {
    aceptar: {
      codigo: 1
    },
    arribo: {
      codigo: 50
    },
    arriboFinalizado: {
      codigo: 55
    },
    finalizado: {
      codigo: 60
    },
    rechazar: {
      codigo: 2
    }
  };

  public static servicios = {
    pendientes: {
      periodo: 30,
      estadoSvc: 'pendientes'
    },
    finalizados: {
      periodo: 30,
      estadoSvc: 'finalizados'
    }
  };

  public static usuarioEstados = {
    libre: {
      id: 1,
      label: 'DISPONIBLE',
      nombre: 'LIBRE'
    },
    enServicio: {
      id: 2,
      label: 'EN SERVICIO',
      nombre: 'EN SERVICIO'
    },
    fueraDeServicio: {
      id: 3,
      label: 'NO DISPONIBLE',
      nombre: 'FUERA DE SERVICIO'
    }
  };

  public static usuarioEstadosById = {
    1: {
      label: 'DISPONIBLE',
      nombre: 'LIBRE'
    },
    2: {
      label: 'EN SERVICIO',
      nombre: 'EN SERVICIO'
    },
    3: {
      label: 'NO DISPONIBLE',
      nombre: 'FUERA DE SERVICIO'
    }
  };

  public static usuarioCambioEstado = {
    alta: {
      estado: 'ALTA',
      motivo: 19
    },
    baja: {
      estado: 'BAJA',
      motivo: 19
    }
  };

  public static codigosEstado = {
    30: {
      buttonClass: 'button-pre-asignado',
      nombre: 'Pre asignado',
      preasignado: true,
      procesando: false
    },
    35: {
      buttonClass: 'button-asignado',
      nombre: 'Asignado',
      asignado: true,
      procesando: false
    },
    40: {
      buttonClass: 'button-rechazado',
      nombre: 'Rechazado',
      procesando: false,
      finalizado: true
    },
    45: {
      buttonClass: 'button-aceptado',
      nombre: 'Movil Acepta',
      procesando: true,
      aceptado: true
    },
    50: {
      buttonClass: 'button-arribo',
      nombre: 'Arribo',
      procesando: true,
      arribo: true
    },
    60: {
      buttonClass: 'button-finalizado',
      nombre: 'Finalizado',
      procesando: false,
      finalizado: true
    },
    100: {
      buttonClass: 'button-preasignado',
      nombre: 'Preasignado',
      procesando: false
    }

  }

  // EndPoints
  public static endPoints = {
    files: '/files'
  };
  public static endPoint = ( endPoint, params:any = {} ) => {

    switch(endPoint) {

      case 'comentariosRegistrar':
        return '/movil/' + params.patente + '/observacion';

      case 'estadoCambio':
        return '/moviles/' + params.patente + '/estado';
      case 'estado':
        return '/estadoactual?patente=' + params.patente;
      case 'estadoCambioMotivos':
        return '/estados?patente=' + params.patente + '&nuevoEstado=' + encodeURI(params.nuevoEstado);

      case 'login':
        return '/accounts';

      case 'motivosRechazo':
        return '/motivosRechazos?patente=' + params.patente;
      case 'motivoAsistencia':
        return '/asistencias';
      case 'motivosAsistencia':
        return '/asistencias?patente=' + params.patente;

      case 'implementos':
        return '/implementos/api/movil/' + params.patente + '/implementos';
      case 'implementosConfirmados':
        return '/implementos/api/movil/' + params.patente + '/implementosInformados';
      case 'implementosDisponibles':
        return '/implementos/api/movil/' + params.patente + '/implementos';
      case 'implementosRegistrar':
        return '/movil/' + params.patente + '/implementos';

      case 'referencias':
        return '/referencias/api/servicios/referencias?servicio=' + params.servicio + '&filtro=' + params.filtro;

      case 'servicios':
        return '/movil/' + params.patente + '/historial?periodo=' + params.periodo + '&estadoSvc=' + params.estadoSvc;
      case 'servicio':
        return '/servicios/' + params.servicio + '/datos?patente=' + params.patente;
      case 'servicioAccion':
        return '/servicios/' + params.patente;
      case 'servicioHistorial':
        return '/movil/' + params.patente + '/historial/datos?servicio=' + params.servicio;

      case 'telefono':
        return '/asistencias/telefonoTrafico?patente=' + params.patente;
    }
    return '';
  };

  // Storage
  public static storage = {
    adicionales: 'adicionales',
    user: 'user',
    servicio: 'servicio',
    images: 'images',
    imagesArrivalEnd: 'imagesArrivalEnd',
    serviceArrival: 'serviceArrival',
    signature: 'signature'
  };

  // Car image
  public static carImage = {
    arribo: {
      1 : {
        image : 'assets/imgs/car1.svg',
        text: 'Parte delantera y costado derecho. SE DEBE VER LA PATENTE.'
      },
      2 : {
        image : 'assets/imgs/car2.svg',
        text: 'Parte trasera y costado derecho. SE DEBE VER LA PATENTE.'
      },
      3 : {
        image : 'assets/imgs/car3.svg',
        text: 'Parte trasera y costado izquierdo. SE DEBE VER LA PATENTE.'
      },
      4 : {
        image : 'assets/imgs/car4.svg',
        text: 'Parte delantera y costado izquierdo. SE DEBE VER LA PATENTE.'
      },
      5 : {
        image : 'assets/imgs/car5.svg',
        text: 'OTRA FOTO.'
      }
    },
    final: {
      1 : {
        image : 'assets/imgs/auto-estacionado.svg',
        text: 'Realizar la captura del vehículo y el lugar donde fue descargado.'
      }
      // ,
      // 2 : {
      //   image : 'assets/imgs/auto-estacionado.svg',
      //   text: '>Realizar la captura del vehículo y el lugar donde fue descargado.'
      // },
      // 3 : {
      //   image : 'assets/imgs/auto-estacionado.svg',
      //   text: '>Realizar la captura del vehículo y el lugar donde fue descargado.'
      // },
      // 4 : {
      //   image : 'assets/imgs/auto-estacionado.svg',
      //   text: '>Realizar la captura del vehículo y el lugar donde fue descargado.'
      // },
      // 5 : {
      //   image : 'assets/imgs/auto-estacionado.svg',
      //   text: '>Realizar la captura del vehículo y el lugar donde fue descargado.'
      // }
    }
  };

  // Image types
  public static imageTypes = {
    firma: {
      code: 1
    },
    arribo: {
      code: 8
    },
    llegada: {
      code: 2
    },
    final: {
      code: 9
    },
  };

};
