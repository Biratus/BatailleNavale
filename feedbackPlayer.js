var feedback={};

/**
 * Cette fonction sert à afficher du texte qui sera constamment présent sur la page.
 * Pour enlever ce texte il faut appeler la fonction hideConstant().
 * 
 * @param {string} text Le texte à afficher
 * @param {x:number,y:number} position La position à laquelle afficher le texte
 * @param {number} size La taille du texte à afficher
 */
feedback.showConstant = function(text,position,size) {
    feedback.constant = {text,position,size};
}

feedback.hideConstant = function() {
    feedback.constant = null;
}

/**
 * Cette fonction sert à afficher du texte d'information. 
 * Le joueur devra clicker pour passer au message suivant.
 * 
 * Exemple (depuis un autre fichier): 
 * 
 * feedback.showWithClick('Bienvenue!','On joue à la bataille navale');
 */
feedback.showWithClick = function () {
    feedback.text = arguments; 
    feedback.index = 0;
}

/**
 * Ne pas appeler cette fonction depuis un autre fichier
 * Cette fonction sert à afficher le texte (constant ou avec les clicks)
 */
feedback.render = function () {
    textAlign(CENTER);
    textSize(40);
    noStroke();
    fill(255,0,0);
    if(feedback.text) text(feedback.text[feedback.index],width/2,height/2);
    if(feedback.constant) {
        textSize(feedback.constant.size);
        text(feedback.constant.text,feedback.constant.position.x,feedback.constant.position.y);
    }
}

/**
 * Ne pas appeler cette fonction depuis un autre fichier
 * Cette fonction sert à afficher le message suivant quand le joueur foit clicker
 */
feedback.next = function() {
    if(feedback.text) {
        feedback.index++;
        if(feedback.index>=feedback.text.length) { // End
            feedback.text = null;
            feedback.callback.call(feedback.args);
        }
    }
}

/**
 * Cette fonction sert à éxécuter du code quand le joueur est arrivé à la fin des messages à clicker
 * 
 * Exemple (depuis un autre fichier)
 * 
 * feedback.whenEnd(function(paramètre) {
 *      // Quelque chose à faire
 * },param)
 * @param {} callback 
 * @param {*} args 
 */
feedback.whenEnd = function(callback,args) {
    feedback.callback = callback;
    feedback.args = args;
}