export class SettingsService {
    private altBackground = false;

    setBackground(isAlt) {
        this.altBackground = isAlt;
    }
    isAltBackground() {
        return this.altBackground;
    }
}