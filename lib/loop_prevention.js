var IN_TROUBLE = 0;

var increase_trouble = function () {
    IN_TROUBLE++;
    if (IN_TROUBLE % 10000 === 0) {
        alert('increase_trouble has been run ' + IN_TROUBLE + ' times.');
    }
    if (IN_TROUBLE > 49000) {
        close();
    }
}