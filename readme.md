# 🎮 Tic-Tac-Toe (Morpion)

## Description

Le jeu **Tic-Tac-Toe** (Morpion) est un jeu classique où deux joueurs s'affrontent dans une grille de **3x3**. L'objectif est d'aligner trois symboles identiques (X ou O) horizontalement, verticalement ou en diagonale. Dans cette version, le joueur affronte une **IA basique** qui joue de manière aléatoire.

---

## Fonctionnalités

- 🎲 **Grille dynamique** : Une grille 3x3 créée avec HTML et CSS.
- 🧠 **IA basique** : L'ordinateur joue en choisissant une case aléatoire vide.
- ✅ **Détection de victoire** : Vérifie toutes les combinaisons gagnantes (lignes, colonnes, diagonales).
- 🚫 **Match nul** : Si toutes les cases sont remplies sans vainqueur.
- 🔄 **Réinitialisation** : Un bouton permet de recommencer une partie à zéro.

---

## Technologies utilisées

- **HTML** : Structure de la page.
- **CSS** : Design et mise en forme.
- **JavaScript** : Logique du jeu.

---

## Instructions d'utilisation

1. **Ouvrez le fichier** `index.html` dans un navigateur web.
2. Cliquez sur une case pour jouer votre tour (vous êtes le joueur **X**).
3. L'ordinateur jouera ensuite automatiquement.
4. Le jeu annonce si :
   - Vous avez gagné 🎉.
   - L'ordinateur a gagné 💻.
   - Il y a égalité 🤝.
5. Cliquez sur le bouton **"Recommencer"** pour redémarrer une partie.

---

## Fonctionnement du code

1. **Création dynamique de la grille** :  
   La grille est générée dynamiquement en JavaScript.

2. **Tour du joueur** :  
   - Lorsqu'une case est cliquée, elle est marquée par **X**.  
   - Le jeu vérifie s'il y a un gagnant ou un match nul.

3. **Tour de l'IA** :  
   L'ordinateur choisit une case aléatoire parmi les cases disponibles.

4. **Vérification de la victoire** :  
   Le jeu compare les cases avec toutes les **combinaisons gagnantes possibles**.

5. **Réinitialisation** :  
   Le bouton **Recommencer** permet de réinitialiser la grille et le statut du jeu.

---

## Exemple d'affichage

- Grille en cours de jeu :

X | O | X
O | X | O
| | X


Statut : **"Vous avez gagné !"**

---

## Améliorations possibles

- Ajouter une **IA plus avancée** (MiniMax Algorithm).
- Permettre un **mode 2 joueurs**.
- Améliorer l'interface utilisateur (animations et design).

---

## Auteur

Développé par [Kei Prince Frejuste] - 2024.