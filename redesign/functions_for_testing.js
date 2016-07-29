var MockComponent = function (props) {
    this.props = {};
    for (var i = 0; i < props.length; i++) {
        this.props[props[i]] = true;
    }
}

MockComponent.prototype.check = function (x) {
    return x in this.props;
}