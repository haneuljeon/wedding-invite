const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalBg = document.getElementById("modalBg");
const modalClose = document.getElementById("modalClose");

document.getElementById("gallery")?.addEventListener("click", (e) => {
  const btn = e.target.closest(".thumb");
  if (!btn) return;
  const src = btn.dataset.src;
  if (!src) return;
  modalImg.src = src;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
});

function closeModal(){
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  modalImg.src = "";
}
modalBg?.addEventListener("click", closeModal);
modalClose?.addEventListener("click", closeModal);

// 계좌 복사
document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const text = btn.getAttribute("data-copy");
    try{
      await navigator.clipboard.writeText(text);
      alert("복사되었습니다!");
    }catch(e){
      // 구형 브라우저 fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      alert("복사되었습니다!");
    }
  });
});

// 링크 공유
document.getElementById("btnShare")?.addEventListener("click", async () => {
  const url = location.href;
  try{
    if (navigator.share){
      await navigator.share({ title: document.title, url });
    }else{
      await navigator.clipboard.writeText(url);
      alert("링크가 복사되었습니다! 카톡에 붙여넣기 해주세요.");
    }
  }catch(e){}
});

// 캘린더 저장(ics 다운로드)
document.getElementById("btnAddCalendar")?.addEventListener("click", () => {
  // TODO: 실제 날짜로 바꾸기 (YYYYMMDDTHHMMSS)
  const ics =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//wedding//invite//KR
BEGIN:VEVENT
UID:${Date.now()}@invite
DTSTAMP:20260101T000000Z
DTSTART:20260101T030000Z
DTEND:20260101T040000Z
SUMMARY:OOO ❤ OOO 결혼식
LOCATION:OO웨딩홀
DESCRIPTION:모바일 청첩장
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "wedding.ics";
  a.click();
  URL.revokeObjectURL(a.href);
});