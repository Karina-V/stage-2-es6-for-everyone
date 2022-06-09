import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`
  });
  // todo: show fighter info (image, name, health, etc.)
   if (fighter) {
     fighterElement.innerHTML = `
      <p>Name:${fighter.name}</p>
      <p>Health: ${fighter.health}</p>
      <p>Attack:${fighter.attack}</p>
      <p>Defense: ${fighter.defense}</p>
      <img src=${fighter.source} />
    `;
  }

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes
  });

  return imgElement;
}
