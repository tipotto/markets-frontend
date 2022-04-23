import $ from 'jquery';

export const scrollWindow = () => {
  $(window).on('scroll', function () {
    const $pagetop = $('#page_top');

    // スクロール位置を取得
    if ($(this).scrollTop() < 1300) {
      $pagetop.removeClass('show');
    } else {
      $pagetop.addClass('show');
    }
  });
};

export const showSearchOptions = (event) => {
  const button = event.target;

  const showText = $(button)
    .parent('#detailed-option-container')
    .find('#detailed-option');

  const smallHeight = 80; // This is initial height.
  const originalHeight = showText.css({ height: 'auto' }).height();

  if (showText.hasClass('open')) {
    // Close
    showText.height(originalHeight).animate({ height: smallHeight }, 300);
    showText.removeClass('open');
    $(button).text('+ オプションを見る').removeClass('active');
  } else {
    // Open
    showText
      .height(smallHeight)
      .animate({ height: originalHeight }, 300, () => {
        showText.height('auto');
      });
    showText.addClass('open');
    $(button).text('- 閉じる').addClass('active');
  }
};

export const showAboutService = (event) => {
  const button = event.target;

  const showText = $(button)
    .parent('#about-service-container')
    .find('#about-service-content');

  const smallHeight = 150; // This is initial height.
  const originalHeight = showText.css({ height: 'auto' }).height();

  if (showText.hasClass('open')) {
    // Close
    showText.height(originalHeight).animate({ height: smallHeight }, 300);
    showText.removeClass('open');
    $(button).text('+ 続きを読む').removeClass('active');
  } else {
    // Open
    showText
      .height(smallHeight)
      .animate({ height: originalHeight }, 300, () => {
        showText.height('auto');
      });
    showText.addClass('open');
    $(button).text('- 閉じる').addClass('active');
  }
};

// const scrollToForm = (event, value) => {
//   console.log('scrollToForm');
//   window.location.href = '#search';
// };

export const scrollDownWindow = () => {
  const speed = 1000;
  const position = $('#result').offset().top;
  $('body,html').animate({ scrollTop: position }, speed, 'swing');
};
