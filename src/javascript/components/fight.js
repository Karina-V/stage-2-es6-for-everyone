import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
    const firstFighterHealth = document.querySelector('#left-fighter-indicator');
    const secondFighterHealth = document.querySelector('#right-fighter-indicator');

    const firstFighterIndicator = {
      healthPercent: 100 / firstFighter.health,
      health: firstFighter.health,
      crit: true
    };

    const secondFighterIndicator = {
      healthPercent: 100 / secondFighter.health,
      health: secondFighter.health,
      crit: true
    };

    let keysPressed = {};
    let isFight = true;

    document.addEventListener('keyup', (event) => {
      delete keysPressed[event.code];
    });

    document.addEventListener('keydown', (event) => {
      keysPressed[event.code] = true;

      if (isFight) {
        if (!keysPressed[controls.PlayerTwoBlock]) {
          if (event.code == controls.PlayerOneAttack && !event.repeat && !keysPressed[controls.PlayerOneBlock]) {
            secondFighterIndicator.health -= getDamage(firstFighter, secondFighter);
            secondFighterHealth.style.width = secondFighterIndicator.health * secondFighterIndicator.healthPercent + '%';
          }
        }

        if (!keysPressed[controls.PlayerOneBlock]) {
          if (event.code == controls.PlayerTwoAttack && !event.repeat && !keysPressed[controls.PlayerTwoBlock]) {
            firstFighterIndicator.health -= getDamage(secondFighter, firstFighter);
            firstFighterHealth.style.width = firstFighterIndicator.health * firstFighterIndicator.healthPercent + '%';
          }
        }

        if (
          controls.PlayerOneCriticalHitCombination.every((key) => keysPressed.hasOwnProperty(key)) &&
          !event.repeat &&
          !keysPressed[controls.PlayerOneBlock] &&
          firstFighterIndicator.crit
        ) {
          secondFighterIndicator.health -= getCriticalHit(firstFighter);
          secondFighterHealth.style.width = secondFighterIndicator.health * secondFighterIndicator.healthPercent + '%';
          firstFighterIndicator.crit = false;
          setTimeout(() => {
            firstFighterIndicator.crit = true;
          }, 10000);
        }

        if (
          controls.PlayerTwoCriticalHitCombination.every((key) => keysPressed.hasOwnProperty(key)) &&
          !event.repeat &&
          !keysPressed[controls.PlayerTwoBlock] &&
          secondFighterIndicator.crit
        ) {
          firstFighterIndicator.health -= getCriticalHit(secondFighter);
          firstFighterHealth.style.width = firstFighterIndicator.health * firstFighterIndicator.healthPercent + '%';
          secondFighterIndicator.crit = false;
          setTimeout(() => {
            secondFighterIndicator.crit = true;
          }, 10000);
        }

        if (firstFighterIndicator.health <= 0) {
          firstFighterHealth.style.width = 0 + '%';
          isFight = false;
          resolve(secondFighter);
        }

        if (secondFighterIndicator.health <= 0) {
          secondFighterHealth.style.width = 0 + '%';
          isFight = false;
          resolve(firstFighter);
        }
      }
    });
  });
}

export function getDamage(attacker, defender) {
  // return damage
  const damage = getHitPower(attacker) - getBlockPower(defender);
  return damage > 0 ? damage : 0;
}

export function getHitPower(fighter) {
  // return hit power
  const criticalHitChance = Math.random() + 1;
  const power = fighter.attack * criticalHitChance;
  return power;
}

export function getBlockPower(fighter) {
  // return block power
  const dodgeChance = Math.random() + 1;
  const block = fighter.defense * dodgeChance;
  return block;
}

export function getCriticalHit(fighter) {
  // return critical hit power
  return fighter.attack * 2;
}
