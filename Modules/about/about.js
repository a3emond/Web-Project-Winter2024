export function InitializeAbout() {
  //besoin d'utiliser window.$ car jQuery n'est pas chargé dans le contexte de ce module`
  const $ = window.$;
  // make sure that the image with mapping stays the original size
  let image = $("#siteMapImage");
  image.css({
    width: image.prop("naturalWidth") + "px",
    height: image.prop("naturalHeight") + "px",
  });

  // Add click event to the areas of the image map
  $("map[name='image-map'] area").on("click", function () {
    let altText = $(this).attr("alt");
    console.log(altText);
    hideAllChildDivs();
    $("#" + altText).show();
    // show the corresponding div and hide the others inside the parent
  });
  // Add divs to the aboutContent div
  addDivs();

  // Add temporary content to the divs
  addTemporaryContentToChildDivs();
  // Hide all the child divs
  hideAllChildDivs();
}
//end of initializeAbout function
//
//
//
function addDivs() {
  let parent = $(".aboutContent");
  let areas = $("map[name='image-map'] area");
  areas.each(function () {
    let id = $(this).attr("alt");
    let div = $("<div></div>").attr("id", id);
    parent.append(div);
  });
}
function addTemporaryContentToChildDivs() {
  let divs = $(".aboutContent div");
  divs.each(function () {
    let id = $(this).attr("id");
    $(this).append("<h2>" + $(this).attr("id") + "</h2>");
    $(this).append(addContent(id));
    console.log($(this).attr("id"));

    $(this).css({
      color: "white",
      border: "1px solid white",
      padding: "10px",
      margin: "10px",
    });
  });
}
function hideAllChildDivs() {
  let divs = $(".aboutContent div");
  divs.each(function () {
    $(this).hide();
  });
}

//switch case pour les différentes sections de la page about selon id
function addContent(id) {
  let content;

  switch (id) {
    case "aboutArea":
      content = `
      <p>
      C'est une page avec une image qui contient 22 zones cliquables.
      c'est ici que j'utilise exclusivement la bibliotheque jQuery.
      <br/>
      <br/>
      le contenu de chaque zone est affiché dans un div correspondant qui est
      caché par défaut. Je les affiche dynamiquement en cliquant sur les zones.
      <br/>
      <br/>
      chaque div est generé dynamiquement et contient un titre et un contenu.
      le contenu lui meme est generé par une fonction qui prend en parametre l'id
      et qui retourne le contenu correspondant dans un switch case.
      </p>
      <p>
      <br/>
      <br/>
      la difficulté que jai rencontré était d'intégrer jQuery dans un module; 
      j'ai du utiliser window.$ pour acceder à jQuery. Étant donné ma conception
      modulaire limitée par les restrictions du cours, j'ai du faire quelques choix
      douteux pour contourner l'absence de server et de gestion de modules.
      <br/>
      En gros, j'ai du charger jQuery dans le fichier index.html parce que c'est là que 
      je charge mes modules et j'ai utilise une variable globale pour acceder à jQuery.
      </p>
      </p>`;
      break;
    case "contactArea":
      content = `
      <p>
      C'est une page simple avec un formulaire de contact qui charge 
      les données de l'utilisateur connecté dans les champs nom et email.
      <br/>
      <br/>
      le formulaire est soumis avec un event listener qui fait apparaître un message 
      de confirmation dans une allerte avec les données du formulaire.
      <br/>
      <br/>
      le formulaire est validé avec un regex pour l'email et un message d'erreur
      est affiché si l'email n'est pas valide.
      <br/>
      <br/>
      Je n'ai eu aucune difficulté particulière à faire cette page. Les styles sont
      réutilisés et la disposition est simple.
      </p>`;
      break;
    case "cartArea":
      content = `
      <p>
      Ici, j'utilise les données de l'utilisateur connecté pour afficher les produits de son panier
      dans un tableau.
      <br/>
      chaque produit est affiché avec une image, son nom, sa couleur et son prix.
      ainsi qu'un bouton pour le retirer du panier qui met à jour le panier,
      le compteur et le localStorage pour sauvegarder les changements.
      <br/>
      <br/>
      Les totaux sont affichés en bas du tableau et mis à jour à chaque changement.
      On retrouve aussi un bouton pour accéder à la page checkout.
      <br/>
      <br/>
      La difficulté ici, c'était de faire en sorte d'afficher les couleurs des produits sur les images.
      Dû aux restrictions causées par l'absence de serveur, j'ai du faire un workaround en faisant la gestion supplementaire
      du stockage des couleurs par utilisateur dans le localStorage et le sessionStorage en plus des Arrays globales 
      au lieu de simplement faire la gestion dans la base de données.	
      </p>`;
      break;
    case "checkoutArea":
      content = `
      <p>
      Cette page est divisée en trois sections: les informations de livraison, les informations de paiement 
      et le résumé de la commande.
      <br/>
      <br/>
      Les informations de livraison sont préremplies avec les données de l'utilisateur connecté.
      Elles sont validées avec un regex et un message d'erreur est affiché si elles ne sont pas valides.
      Elles peuvent ensuite être sauvegardées dans le localStorage et sont rendues disponibles 
      pour les prochaines commandes selon l'utilisateur connecté.
      <br/>
      <br/>
      Les informations de paiement sont validées avec un regex et un message d'erreur est affiché si elles ne sont pas valides.
      <br/>
      <br/>
      Le résumé de la commande affiche les produits du panier avec leur image, nom, couleur et prix.
      Les totaux sont affichés en bas du tableau.
      <br/>
      <br/>
      Les principales difficultés rencontrées ici étaient de faire la gestion de deux formulaires en les faisant 
      communiquer entre eux et de faire en sorte que les données soient sauvegardées pour les prochaines commandes.
      Encore une fois, j'ai du faire un workaround pour sauvegarder les données dans le localStorage et le sessionStorage
      </p>`;
      break;
    case "shopArea":
      content = `
      <p>
      C'est une page qui genère dynamiquement une carte pour chaque produit que je charge depuis un fichier JSON.
      Ici, je me suis amusé un peu en faisant quelques fonctionnalités comme le changement de couleur des t-shirts.
      <br/>
      <br/>
      Pour chaque produit, j'ai ajouté un bouton pour changer la couleur du t-shirt qui retrouve quel 
      t-shirt est sélectionné et change la couleur de l'image du t-shirt. Un panel s'affiche quand l'utilisateur 
      clique sur la petite icone de t-shirt pour choisir la couleur et se referme apres avoir choisi.
      <br/>
      <br/>	
      J'ai aussi ajouté un bouton pour ajouter le produit au panier qui met à jour le panier, 
      le compteur et le localStorage en montrant un panel qui permet de confirmer l'ajout.
      <br/>
      <br/>
      La principale difficulté ici était de faire en sorte que les couleurs des t-shirts soient sauvegardées
       et envoyées au panier.
      </p>`;
      break;
    case "modulesContainerArea":
      content = `
      <p>
      C'est une section de la page index où je charge les différents modules de l'application.
      <br/>
      <br/>
      Chaque module est chargé dans un div correspondant et est initialisé avec une fonction qui lui est propre.
      Le chargement est fait avec la fonction fetch et le contenu est inséré dans le div principal.
      <br/>
      <br/>
      la fonction fetch: La fonction fetch() est une fonction intégrée en JavaScript qui permet de faire des requêtes HTTP.
       Elle renvoie une promesse qui résout en l'objet Response représentant la réponse à la requête.
      </p>`;
      break;
    case "navBarArea":
      content = `
      <p>
      La barre de navigation est activée et chargée dans la page index apres la connexion de l'utilisateur. 
      Elle contient les liens pour les différentes sections de l'application en plus d'afficher 
      un message de bienvenue personnalisé pour l'utilisateur connecté ainsi que l'heure en temps réel.
      <br/>
      <br/>
      On y retrouve aussi le panier de l'utilisateur avec le nombre de produits et un lien pour accéder au panier en plus
      d'un lien pour se déconnecter qui nous ramène à la page de connexion en effacant les données du SessionStorage.
      <br/>
      <br/>
      la navigation est faite avec des event listeners qui chargent les modules correspondants dans le div principal.
      C'est ici que l'on retrouve la majorité des chargements de modules de l'application.
      </p>`;
      break;
    case "headerArea":
      content = `<p>Une simple section qui contient le design du logo de la compagnie</p>`;
      break;
    case "indexArea":
      content = `<p>C'est la page principale de l'application;
      j'ai tenté de faire un design qui ressemble à un one-page website avec des sections 
      qui se chargent dynamiquement sans utiliser de serveur ni de framework.
      <br/>
      <br/>
      Techniquement, c'est un succès; si vous regardez la barre de navigation, vous verrez que
      vous ne quittez jamais la page index. C'est parce que je charge les modules dans le div principal
      </p>`;
      break;
    case "dataArea":
      content = `<p>
      Ici, le principe était d'éviter d'utiliser une base de données et de faire en sorte que les données
      soient sauvegardées dans des fichiers JSON.
      <br/>
      <br/>
      J'ai donc créé des fichiers JSON pour les produits, les couleurs et les utilisateurs mais me suis frappé à 
      un mur quand j'ai réalisé que je ne pouvais pas modifier les fichiers JSON sans un serveur...
      <br/>
      Je me suis donc tourné vers le localStorage et le sessionStorage pour sauvegarder les données des utilisateurs c
      ce qui a complexifié la gestion des données. Avec du recul, j'aurais probablement dû utiliser une base de données;
      ça aurait été plus simple. N'en faisont pas de cas, ce n'était pas le but de l'exercice.
      </p>`;
      break;
    case "jsonArea":
      content = `<p>C'est dans des fichiers json que je concerve des Arrays d'objets avec leurs propriétés respectives</p>`;
      break;
    case "localStorageArea":
      content = `<p>Apres avoir chargé les données des fichiers JSON, je transfert celles-ci dans le localStorage
       pour simmuler une interaction, disons statique, des données d'utilisateur. </p>`;
      break;
    case "sessionStorageArea":
      content = `<p>Je me sert du sessionStorage pour garder un tracking de l'utilisateur connecté;
      Ça permet de déconnecter les utilisateurs lors de la fermeture du browser</p>`;
      break;
    case "userArea":
      content = `<p>Chaque utilisateur a ses propre informations et son propre panier</p>`;
      break;
    case "signInSignOutArea":
      content = `<p>C'est la page de connexion et d'inscription. les formulaires vérifient que chaque champ est 
      rempli avant de faire la validation et la sauvegarde.
      <br/>
      <br/>
      Les utilisateurs sont sauvegardés dans un Array global et dans le localStorage pour les prochaines connexions.

      </p>`;
      break;
    case "infoArea":
      content = `<p>Chaque utilisateur est sauvegardé avec des informations propre a chacun qui sont réutilisées 
      durant le magasinage à travers toutes les sections du site</p>`;
      break;
    case "userCartArea":
      content = `<p>Les informations du panier sont persistantes même si l'utilisateur ferme le navigateur ou se déconnecte
      ; lors de la reconnexion, il retrouve son panier et son contenu.
      Pour le moment, je n'ai pas implenté l'historique d'achat étant donné les restrictions du cours.
      </p>`;
      break;
    case "assetsArea":
      content = `<p>Tous les assets ont été créés individuellement pour le projet et sont référencés dans lkes fichiers 
      JSON pour être utilisés dans l'application web par la suite</p>`;
      break;
    case "productsArea":
      content = `<p>Les produits sont classés dans des fichiers Json avec leurs propriétés et leur assets respectifs
       Pour le projet, j'ai créé près de 60 t-shirts différents avec un choix de plus de 50 couleurs pour chaque t-shirt.
      </p>`;
      break;
    case "colorsArea":
      content = `<p>Chaque couleur contient son nom, son code hexadécimale et une image en forme de tshirt la représentant</p>`;
      break;
    case "usersArea":
      content = `<p>Les données utilisateurs sont conservées dans un fichier JSON. Les nouveaux utilisateurs créés cependant sont enregistrés localement à cause de la restriction du serveur pour le projet</p>`;
      break;
    default:
      content = `<p></p>`;
      break;
  }

  return content;
}
