# Application conference
* Pierre GEFFRIAUD
* Ecole Des Mines de Nantes
* Filière Ingénierie Logicielle A3

## Lancement de l'application sur mobile ou émulateur
`ionic run [android|ios]`

## Avertissements
 - Temps de chargement de la liste des sessions un peu longue (quelques secondes)
 - L'application n'a pas été testée sur IOS

## Fonctionnalités développées
* Lister les sessions (triées par heures et par nom)
* Accéder au détail d'une session et les speakers associés
* Lister les speakers
* Accéder au détail d'un speaker et les sessions associées
  * Lien vers les pages perso
* Ajouter des sessions à sa liste de favoris et les lister
* Ajouter/supprimer un speaker à la liste de contact du téléphone
* Prise de note sur une session
  * Ajout/suppression d'une photo
  * Ajout/lecture d'une vidéo
  * Ajout/lecture d'un enregistrement audio
  * Partage de la photo sur les réseaux sociaux
* Utilisation d'une base intégré pour le stockage de données (prise de note, favoris)
* Page à propos qui liste des informations liées au téléphone, à l'application et au développeur
  * InAppBrowser pour les pages persos  
