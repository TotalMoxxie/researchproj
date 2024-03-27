export class BasicCharacterControllerInput {
    constructor() {
        // Initialize any properties or perform any setup logic here
        this._keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            shift: false
        };

        // Add event listeners for keydown and keyup events
        document.addEventListener('keydown', this._OnKeyDown.bind(this));
        document.addEventListener('keyup', this._OnKeyUp.bind(this));
    }

    _OnKeyDown(event) {
        // Update key state based on pressed key
        switch (event.keyCode) {
            case 87: // W
                this._keys.forward = true;
                break;
            case 83: // S
                this._keys.backward = true;
                break;
            case 65: // A
                this._keys.left = true;
                break;
            case 68: // D
                this._keys.right = true;
                break;
            case 16: // Shift
                this._keys.shift = true;
                break;
        }
    }

    _OnKeyUp(event) {
        // Update key state based on released key
        switch (event.keyCode) {
            case 87: // W
                this._keys.forward = false;
                break;
            case 83: // S
                this._keys.backward = false;
                break;
            case 65: // A
                this._keys.left = false;
                break;
            case 68: // D
                this._keys.right = false;
                break;
            case 16: // Shift
                this._keys.shift = false;
                break;
        }
    }

    // Add any additional methods or properties as needed
}
