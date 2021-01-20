# Resolver problema con CORS #

## Agregar archivo proxy.conf.json ##
```
{
    "/api/*": {
      "target": "url",
      "secure": false,
      "logLevel": "debug",
      "changeOrigin": true
    }
}
```

## Modificar el packaje.json ##
```
"scripts": {
    "ng": "ng",
    "start": "ng serve --proxy-config proxy.conf.json",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
```

## Cambiar la petición al server ##
```
serverUrl: '/api',
filesUrl: '/files'
```

## Ejecutar con npm start ##

