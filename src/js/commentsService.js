import { getParams, setLocalStorage, getLocalStorage } from "./utils.mjs";

const form = document.querySelector("#comment-form");

class CommentsService {
  constructor(localStoragaKey, productId) {
    this.localStoragaKey = localStoragaKey;
    this.productId = productId;
  }

  getComments() {
    return getLocalStorage(this.localStoragaKey);
  }

  saveComment() {
    const textAreaValue = document.querySelector("#comment-textarea").value;

    const comments = this.getComments();

    // create localstorage for comments
    if (!comments) {
      setLocalStorage(this.localStoragaKey, [
        {
          productId: this.productId,
          comments: [textAreaValue],
        },
      ]);

      return;
    }

    // const productComments = comments.find(
    //   (comment) => comment.productId === this.productId
    // );

    // const newComment = {
    //   ...productComments,
    //   comments: [...productComments.comments, textAreaValue],
    // };

    const index = comments.findIndex(
      (entry) => entry.productId === this.productId
    );

    let commentsCopy = [...comments];

    commentsCopy[index].comments = [
      ...commentsCopy[index].comments,
      textAreaValue,
    ];

    setLocalStorage(this.localStoragaKey, commentsCopy);

    // if (productComments) {
    //   const newComment = {
    //     ...productComments,
    //     comments: [...productComments.comments, textAreaValue],
    //   };

    //   const index = comments.findIndex((entry) => entry.id === productId);

    //   const updatedComments = [...comments];

    //   updatedComments[index] = newComment;

    //   setLocalStorage(this.localStoragaKey, [updatedComments]);

    //   return;
    // }

    // setLocalStorage(this.localStoragaKey, [
    //   ...comments,
    //   {
    //     productId: this.productId,
    //     comments: [textAreaValue],
    //   },
    // ]);
  }

  printComments() {
    const commentsContainer = document.querySelector(".comments");

    const comments = this.getComments();

    if (comments) {
      const productComments = comments.find(
        (comment) => comment.productId === this.productId
      );

      if (productComments) {
        productComments.comments.forEach((comment) => {
          const template = `
          <div class="comment">
          <img src="https://ui-avatars.com/api/?name=John+Doe" alt="user profile image" />
          <textarea disabled>${comment}</textarea>
          </div>`;

          commentsContainer.insertAdjacentHTML("afterend", template);
        });
      }
    }
  }

  printNewComment() {
    const commentsContainer = document.querySelector(".comments");

    const comments = this.getComments();

    const productComments = comments.find(
      (comment) => comment.productId === this.productId
    );
    console.log(
      "🚀 ~ file: commentsService.js:87 ~ CommentsService ~ printNewComment ~ productComments:",
      productComments
    );

    // if(productComments){

    // }
    const newComment = productComments.comments.slice(-1);

    const template = `
    <div class="comment">
      <img src="https://ui-avatars.com/api/?name=John+Doe" alt="user profile image" />
        <textarea disabled>${newComment[0]}</textarea>
    </div>`;

    commentsContainer.insertAdjacentHTML("afterend", template);
  }
}

const commentService = new CommentsService("comments", getParams("product"));

commentService.printComments();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  commentService.saveComment();

  // commentService.printNewComment();
});
