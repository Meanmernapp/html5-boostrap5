$(document).ready(function () {
  // For drodown menu
  $(".select__dropdown__button").on("click", function (event) {
    event.stopPropagation();
    $(this).parent().find(".select__dropdown__list").toggleClass("active");
  });
  $(".select__dropdown__list-item").on("click", function () {
    var itemValue = $(this).data("value");
    $(this)
      .parent()
      .parent()
      .find(".select__dropdown__button span")
      .text($(this).text())
      .parent()
      .attr("data-value", itemValue);
    $(this)
      .parent()
      .parent()
      .find(".select__dropdown__list")
      .toggleClass("active");
  });

  // Card drodpown menu on dots click
  $(".card__box__menu button").on("click", function (event) {
    event.stopPropagation();
    $(this).parent().find(".card__box__menu__items").toggleClass("d-flex");
  });

  $(document).click(function () {
    $(".card__box__menu__items").removeClass("d-flex");
    $(".select__dropdown__list").removeClass("active");
  });

  $(".card__box__menu__items li").on("click", function () {
    var itemValue = $(this).data("value");
    $(this).parent().removeClass("d-flex");

    $(".card__box__menu__items li").removeClass("active");
    $(this).addClass("active");

    if ($(this).parent().parent().parent().find(".selected__value")) {
      $(this)
        .parent()
        .parent()
        .parent()
        .find(".selected__value")
        .text(itemValue);
    }
  });

  //Dashboard sidebar header exapnd
  $(".dashboard__sidebar__header").on("click", function () {
    $(this).toggleClass("active");
    $(".dashboard__sidebar__item").toggleClass("d-none");
  });

  //Dashboard tab exapnd
  $(".dashboard__table__accordion").on("click", function () {
    $(this).toggleClass("active");
    $(".dashboard__table__content").toggleClass("d-none");
  });

  // Dashboard page load more table data
  var numRows = $(".dashboard__table__content tbody").find("tr").length;
  var SHOWN = 5;
  var MORE = 5;

  /* get how many more can be shown */
  var getNumMore = function (ns) {
    var more = MORE;
    var leftOver = numRows - ns;
    if (leftOver < more) {
      more = leftOver;
    }
    return more;
  };
  /* how many are shown */
  var getInitialNumShown = function () {
    var shown = SHOWN;
    if (numRows < shown) {
      shown = numRows;
    }
    return shown;
  };
  /* set how many are initially shown */
  var numShown = getInitialNumShown();

  /* set the numMore if less than 20 */
  var numMore = getNumMore(numShown);

  $(".dashboard__table__content tbody")
    .find("tr:gt(" + (numShown - 1) + ")")
    .hide();

  $(".dashboard__table__content .button").click(function () {
    /* determine how much more we should update */
    numMore = getNumMore(numShown);
    /* update num shown */
    numShown = numShown + numMore;
    $(".dashboard__table__content tbody")
      .find("tr:lt(" + numShown + ")")
      .show();

    /* determine if to show more and how much left over */
    numMore = getNumMore(numShown);
    if (numMore <= 0) {
      $(".dashboard__table__content .button").hide();
    }
  });

  // Dashboard page line and radial chart
  var lineChartOptions = {
    series: [
      {
        data: [20, 41, 20, 30, 22, 40],
      },
    ],
    chart: {
      height: 60,
      width: 80,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#4E46B4"],
    stroke: {
      width: 3,
      curve: "smooth",
    },
    tooltip: {
      enabled: false,
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
  };

  var options = {
    series: [70],
    chart: {
      height: 68,
      width: 40,
      type: "radialBar",
    },
    colors: ["#40A69F"],
    plotOptions: {
      radialBar: {
        hollow: {
          size: "5%",
        },
        dataLabels: {
          name: {
            show: false,
          },
        },
      },
    },
    labels: [""],
  };

  const allLineChart = $(".topic__chart");
  $.each(allLineChart, function (e, ele) {
    var chart = new ApexCharts(ele, lineChartOptions);
    chart.render();
  });

  const allRadialChart = $(".topic__redial__chart");
  $.each(allRadialChart, function (e, ele) {
    var radialChart = new ApexCharts(ele, options);
    radialChart.render();
  });

  // Result page summary accordion
  var acc = document.getElementsByClassName("result__summary__item--header");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }

  // Result Page select on right sidebar item change content
  $(".result__page .result__sidebar__item").on("click", function (event) {
    const dataId = $(this).attr("data-id");
    if (dataId) {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $("#" + dataId).hide();
        $(".result__info__default").show();
      } else {
        $(".result__sidebar__item").removeClass("active");
        $(this).addClass("active");
        $(".result__info__default").hide();
        $(".result__info__video").hide();
        $("#" + dataId).show();
      }
    }
  });
  $(".result__search__right").on("click", function (event) {
    $(this).parent().find("input").val("");
  });

  $(".notebook__sidebar__title").on("click", function (event) {
    $(this).parent().find(".notebook__sidebar__list").toggle();
    $(this).parent().toggleClass("active");
  });

  $(".btn__add").on("click", function (event) {
    event.stopPropagation();
  });
  $(".btn__more").on("click", function (event) {
    event.stopPropagation();
  });
  $(".notebook__sidebar__list--item").on("click", function (event) {
    $(this)
      .parent()
      .find(".notebook__sidebar__list--item")
      .removeClass("active");
    $(this).addClass("active");
  });

  if (document.querySelector("#editor")) {
    ClassicEditor.create(document.querySelector("#editor"), {
      toolbar: {
        items: [
          "undo",
          "redo",
          "|",
          "heading",
          "|",
          "fontfamily",
          "fontsize",
          "fontColor",
          "fontBackgroundColor",
          "|",
          "bold",
          "italic",
          "strikethrough",
          "subscript",
          "superscript",
          "code",
          "|",
          "link",
          "uploadImage",
          "blockQuote",
          "codeBlock",
          "|",
          "bulletedList",
          "numberedList",
          "todoList",
          "outdent",
          "indent",
        ],
        shouldNotGroupWhenFull: false,
      },
    }).catch((error) => {
      console.error(error);
    });
  }
  $(".notebook__content__left__items").hide();
  setTimeout(function loader() {
    $(".notebook__content__left__loader").hide();
    $(".notebook__content__left__items").show();
  }, 3000);

  /* Audio Player */
  // Coded by: https://mmzand.ir
  // Credit: https://code-boxx.com/html-custom-audio-player/#sec-audio
  // (A) SUPPORT FUNCTION - FORMAT HH:MM:SS
  var timeString = (secs) => {
    // (A1) HOURS, MINUTES, SECONDS
    let ss = Math.floor(secs),
      hh = Math.floor(ss / 3600),
      mm = Math.floor((ss - hh * 3600) / 60);
    ss = ss - hh * 3600 - mm * 60;

    // (A2) RETURN FORMATTED TIME
    if (hh > 0) {
      mm = mm < 10 ? "0" + mm : mm;
    }
    ss = ss < 10 ? "0" + ss : ss;
    return hh > 0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`;
  };

  function setProgress(elTarget) {
    let divisionNumber = elTarget.getAttribute("max") / 100;
    let rangeNewWidth = Math.floor(elTarget.value / divisionNumber);
    if (rangeNewWidth > 95) {
      elTarget.nextSibling.style.width = "95%";
    } else {
      elTarget.nextSibling.style.width = rangeNewWidth + "%";
    }
  }

  for (let i of document.querySelectorAll(".audio__player__wrapper")) {
    // (B) AUDIO + HTML SETUP + FLAGS
    i.audio = new Audio(encodeURI(i.dataset.src));
    (i.aPlay = i.querySelector(".audio__player__button")),
      (i.aPlayIco = i.querySelector(".aPlayIco")),
      (i.aNow = i.querySelector(".aNow")),
      (i.aTime = i.querySelector(".aTime")),
      (i.aSeek = i.querySelector(".aSeek")),
      (i.aVolume = i.querySelector(".aVolume")),
      (i.aVolIco = i.querySelector(".aVolIco"));
    i.seeking = false; // user is dragging the seek bar

    // (C) PLAY & PAUSE
    // (C1) CLICK TO PLAY/PAUSE
    i.aPlay.onclick = () => {
      if (i.audio.paused) {
        i.audio.play();
      } else {
        i.audio.pause();
      }
    };

    // (C2) SET PLAY/PAUSE ICON
    i.audio.onplay = () =>
      (i.aPlayIco.innerHTML = '<i class="bi bi-pause"></i>');
    i.audio.onpause = () =>
      (i.aPlayIco.innerHTML = '<i class="bi bi-play"></i>');

    // (D) TRACK PROGRESS & SEEK TIME
    // (D1) TRACK LOADING
    i.audio.onloadstart = () => {
      i.aNow.innerHTML = "Loading";
      i.aTime.innerHTML = "";
    };

    // (D2) ON META LOADED
    i.audio.onloadedmetadata = () => {
      // (D2-1) INIT SET TRACK TIME
      i.aNow.innerHTML = timeString(0);
      i.aTime.innerHTML = timeString(i.audio.duration);

      // (D2-2) SET SEEK BAR MAX TIME
      i.aSeek.max = Math.floor(i.audio.duration);

      // (D2-3) USER CHANGE SEEK BAR TIME
      i.aSeek.oninput = () => (i.seeking = true); // prevents clash with (d2-4)
      i.aSeek.onchange = () => {
        i.audio.currentTime = i.aSeek.value;
        if (!i.audio.paused) {
          i.audio.play();
        }
        i.seeking = false;
      };

      // (D2-4) UPDATE SEEK BAR ON PLAYING
      i.audio.ontimeupdate = () => {
        if (!i.seeking) {
          i.aSeek.value = Math.floor(i.audio.currentTime);
        }
        i.aNow.innerHTML = timeString(i.audio.currentTime);
        let divisionNumber = i.aSeek.getAttribute("max") / 100;
        let rangeNewWidth = Math.floor(i.aSeek.value / divisionNumber);
        if (rangeNewWidth > 95) {
          i.aSeek.nextSibling.style.width = "95%";
        } else {
          i.aSeek.nextSibling.style.width = rangeNewWidth + "%";
        }
      };
    };

    // (F) ENABLE/DISABLE CONTROLS
    i.audio.oncanplaythrough = () => {
      i.aPlay.disabled = false;
      i.aVolume.disabled = false;
      i.aSeek.disabled = false;
    };
    i.audio.onwaiting = () => {
      i.aPlay.disabled = true;
      i.aVolume.disabled = true;
      i.aSeek.disabled = true;
    };

    i.aSeek.addEventListener("input", function () {
      setProgress(this);
    });

    i.aVolume.addEventListener("input", function () {
      setProgress(this);
    });
  }

  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ["Task", "Hours per Day"],
      ["Work", 11],
      ["Eat", 2],
    ]);

    var options = {
      legend: "none",
      pieSliceText: "none",
      pieStartAngle: 135,
      tooltip: { trigger: "none" },
      slices: {
        0: { color: "#40A69F" },
        2: { color: "red" },
      },
    };

    const items = document.querySelectorAll(".piechart");
    [].forEach.call(items, function (el) {
      var chart = new google.visualization.PieChart(el);

      chart.draw(data, options);
    });
  }

  // Dashboard page line and radial chart
  var adminLineChartOptions = {
    series: [
      {
        data: [20,53,24,36,28,30, 70, 32, 60, 80, 130, 44, 20, 35],
      },
    ],
    chart: {
      height: 120,
      width: 200,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#FF4E64"],
    stroke: {
      width: 3,
      curve: "smooth",
    },
    tooltip: {
      enabled: false,
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
  };

  const allAdminLineChart = $(".admin__topic__chart");
  $.each(allAdminLineChart, function (e, ele) {
    var chart = new ApexCharts(ele, adminLineChartOptions);
    chart.render();
  });
});
