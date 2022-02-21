//notif pop up
const notifAddToCart = window.createNotification({
    //option ici
  });
  notifAddToCart({
    titre : 'Ajout au panier',
    message : 'Votre selection a bien été ajoutée au panier'
  });
  notifAddToCart({
    // fermer au clic
    closeOnClick : vrai,
    // affiche le bouton de fermeture
    displayCloseButton : faux,
    // nfc-haut-gauche
    // nfc-bas-droite
    // nfc-bas-gauche
    positionClass: 'nfc-haut-droite',
    // rappeler
    onclick : faux,
    // timeout en millisecondes
    afficherDurée: 3500,
    // succès, info, avertissement, erreur et aucun
    thème : "succès"
    
  });