function toPascalCase(string) {
    return `${string}`
      .replace(new RegExp(/[-_]+/, 'g'), ' ')
      .replace(new RegExp(/[^\w\s]/, 'g'), '')
      .replace(
        new RegExp(/\s+(.)(\w+)/, 'g'),
        ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
      )
      .replace(new RegExp(/\s/, 'g'), '')
      .replace(new RegExp(/\w/), s => s.toUpperCase());
}

function camalize(str) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

module.exports = {
    toPascalCase,
    camalize,
}