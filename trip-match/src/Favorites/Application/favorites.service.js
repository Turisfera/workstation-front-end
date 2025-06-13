const FAVORITES_KEY = 'trip-match-favorites';
export class FavoritesService {
    getFavorites() {
        const favorites = localStorage.getItem(FAVORITES_KEY);
        return favorites ? JSON.parse(favorites) : [];
    }

    _saveFavorites(favorites) {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
    addFavorite(experienceId) {
        const favorites = this.getFavorites();
        if (!favorites.includes(experienceId)) {
            favorites.push(experienceId);
            this._saveFavorites(favorites);
        }
    }
    removeFavorite(experienceId) {
        let favorites = this.getFavorites();
        favorites = favorites.filter(id => id !== experienceId);
        this._saveFavorites(favorites);
    }
    isFavorite(experienceId) {
        const favorites = this.getFavorites();
        return favorites.includes(experienceId);
    }
}