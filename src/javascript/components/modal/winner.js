import { showModal } from './modal';

export function showWinnerModal(fighter) {
  // call showModal function
  showModal({
    title: 'Winner is:', bodyElement: fighter.name, onClose: () => {
      window.location.reload();
    }
  });
}
