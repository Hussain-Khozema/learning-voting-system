App = {
    accountName: "TESTER NAME",
    voted:[0 , 0 , 0],
    votedReplies:[[0],[0],[]],
    showCollapsed: -1,
    commentIndexToReply:0,
    comments :
    [
        {name:"JEREMY BOOK KAY YIP" , 
         content:"What is the algorithm that returns the shortest distance?" , 
         votes:10,
         haveTimeStamp: true,
         timestamp:242,
         commentID:0,
         postTime:1579156309478,
        replies:[{name:"BOON HING" , content:"Dijkstra's algorithm (or Dijkstra's Shortest Path First algorithm, SPF algorithm) is an algorithm for finding the shortest paths between nodes in a graph" , votes:2},
                  
                ]
        },
        {name:"WONG YING" , 
         content:"Does the type of programming language used affects the efficiency of an algorithm?" , 
         votes:21,
         haveTimeStamp: true,
         timestamp:263,
         commentID:1,
         postTime:1579156390158,
        replies:[{name:"HUSSAIN" , content:"Yes" , votes:5},

                ]
        },
        {name:"MING KANG" , 
        content:"What is the meaning of brute force in this context?" , 
        votes:11,
        haveTimeStamp: true,
        timestamp:277,
        commentID:2,
        postTime:1579156390200,
       replies:[

               ]
       }

    ],
    showorhideReply: function(o){
      App.showCollapsed = -1
      let commentIndex = o.data('index')
      
      if(!$("#collapse" + commentIndex).hasClass("show")){
        o.text("Hide Replies")
      }
      else{
        o.text("Show Replies")
      }
      
    },
    sortByVoteLeast:function(){
      App.comments.sort((a, b) => Number(a.votes) - Number(b.votes));
      App.render()
    },
    sortByVoteTop:function(){
          App.comments.sort((a, b) => Number(b.votes) - Number(a.votes));
          App.render()
      },
    sortByTimeOldest:function(){
        App.comments.sort((a, b) => Number(a.postTime) - Number(b.postTime));
        App.render()
    },
    sortByTimeNewest:function(){
      App.comments.sort((a, b) => Number(b.postTime) - Number(a.postTime));
      App.render()
  },
    load:function(){
      
        App.render()
    },
    render:function(){
      $('#accordionExample-1').html("")
        for (let commentIndex = 0; commentIndex < App.comments.length; commentIndex++) 
        {
          let voteStatus = App.voted[App.comments[commentIndex].commentID]
          let replies = ""
          
          for (let i = 0;i < App.comments[commentIndex].replies.length; i++)
                        {
                          let voteStatus = App.votedReplies[App.comments[commentIndex].commentID][i]
                          replies = replies.concat(`<div class="d-flex flex-row p-2 bd-highlight">
                          <div class = "d-flex flex-column p-2" style = "margin-top:0.5rem;">
                            <img class="bd-highlight" onclick="App.voteReply(${commentIndex}, ${i} , ${voteStatus == 1 ? "-1" : ((voteStatus == 0)? "1": "2" )})" src="${(voteStatus == 1) ? "assets/up1.png" : "assets/up.png" }" alt="Up arrow" style="width:30px;height:30px;">
                            <p class="bd-highlight" id="voteReply${commentIndex + "and" + i}" style = "justify-content: center; align-items: center; margin-top: 0.5rem; margin-bottom: 0.5rem;text-align:center;">${App.comments[commentIndex].replies[i].votes}</p>
                            <img class="bd-highlight" onclick="App.voteReply(${commentIndex} , ${i},${voteStatus == -1 ? "1" : ((voteStatus == 0)? "-1": "-2" )})" src="${(voteStatus == -1) ? "assets/down1.png" : "assets/down.png" }" alt="down arrow" style="width:30px;height:30px;">
                          </div>
                          <div class = "p-2">
                            <div class="row">
                              <div class = "col"> <p><u>${App.comments[commentIndex].replies[i].name}</u></p></div>
                            </div>
                            <p>${App.comments[commentIndex].replies[i].content}</p>
                          </div>
                        </div>
                        <div class = "container-fluid" style="height: 1px; background-color: rgba(191, 186, 186);line-height: 40px;"></div>
                        `
                          )}
          $('#accordionExample-1').append(`
          
          <div class ="card">
          <div class="card-header d-flex flex-row p-2 bd-highlight" id="headingOne">
              <div class = "d-flex flex-column p-2" id="${commentIndex}" data-index="${commentIndex}" style = "margin-top:0.5rem;">
                    <img class="bd-highlight" onclick="App.vote(${commentIndex} , ${voteStatus == 1 ? "-1" : ((voteStatus == 0)? "1": "2" )})" src="${(voteStatus == 1) ? "assets/up1.png" : "assets/up.png" }" alt="Up arrow" style="width:30px;height:30px;">
                    <p class="bd-highlight" id="vote${commentIndex}" style = "justify-content: center; align-items: center; margin-top: 0.5rem; margin-bottom: 0.5rem;text-align:center;">${App.comments[commentIndex].votes}</p>
                    <img class="bd-highlight" onclick="App.vote(${commentIndex} ,${voteStatus == -1 ? "1" : ((voteStatus == 0)? "-1": "-2" )})" src="${(voteStatus == -1) ? "assets/down1.png" : "assets/down.png" }" alt="down arrow" style="width:30px;height:30px;">
              </div>
                <div class = "p-2">
                  <div class="row justify-content-start">
                    <div class = "col-md-auto"> <p><u>${App.comments[commentIndex].name}</u></p></div>
                    <div class = "col-md-auto">  <a href="#" onclick="seekTo(${App.comments[commentIndex].timestamp});">${App.comments[commentIndex].haveTimeStamp?App.convertToTimeFormat(App.comments[commentIndex].timestamp) : ""}</a></div>
                  </div>
                  <p>${App.comments[commentIndex].content}</p>
                  <a href="#replymodal" onclick="App.commentIndexToReply = ${commentIndex};return false;" data-toggle="modal" style="float:left;">Reply</a>
                  <button class="btn btn-link" style = "position:relative; bottom:6.5px;" type="button" onclick="App.showorhideReply($(this));return false;" data-index="${commentIndex}" data-toggle="collapse" data-target="#collapse${commentIndex}" aria-expanded="true" aria-controls="collapse${commentIndex}">
                    ${(App.showCollapsed == commentIndex)?"Hide Replies":"Show Replies"}
                  </button>
                </div>
              </div>
              <div id="collapse${commentIndex}" class="collapse ${(App.showCollapsed == commentIndex)?"show":""}" aria-labelledby="${commentIndex}" data-parent="#accordionExample-1">
                <div class="card-body">
                <!-- sub replies-->
                <div class = "container-fliud" >
                      <div class="d-flex flex-column bd-highlight mb-3">
                      ${replies}
                      </div>
                </div>
              <!--end of sub replies-->
                </div>
              </div>
            </div>
         
            <div class = "container-fluid" style="height: 3px; background-color: rgba(191, 186, 186);line-height: 40px;"></div>
        `)
        }
       
    },
    comment:function(){
        let commentContent = $('#user-question').val()
        let timestampVal = $('#user-timestamp').val()
        let haveTimeStampVal = true
        if(timestampVal == "")
        {
          haveTimeStampVal = false
          timestampVal = "0"
        }
        App.comments.push({name:App.accountName , content: commentContent , votes:0, haveTimeStamp: haveTimeStampVal, timestamp: App.convertToSeconds(timestampVal), commentID: App.comments.length, postTime:Date.now(), replies:[]})
        App.voted.push(0)
        App.votedReplies.push([])
        App.render()
    },
    replyToComment: function(){
        let replyContent = $('#user-reply').val()
        App.comments[App.commentIndexToReply].replies.push({name:App.accountName , content:replyContent , votes:0})
        App.votedReplies[App.comments[App.commentIndexToReply].commentID].push(0)
        App.showCollapsed = App.commentIndexToReply
        App.render()
    },
    vote:function(id , point){
        let commentIndex = $("#" + id).data("index")
        App.comments[commentIndex].votes += point
        App.voted[App.comments[commentIndex].commentID] += point
        $("#vote" + id).text(App.comments[commentIndex].votes)
        App.render()
    },
    voteReply:function(id, replyIndex, point){
      let commentIndex = $("#" + id).data("index")
      App.comments[commentIndex].replies[replyIndex].votes += point
      App.votedReplies[App.comments[commentIndex].commentID][replyIndex] += point
      $("#voteReply" + id + "and" + replyIndex).text(App.comments[commentIndex].replies[replyIndex].votes)
      App.showCollapsed = id
      App.render()
  },
    convertToTimeFormat:function(seconds){
      let p1 = "0"
      let p2 = "0"
      let p3 = "0"
      p1 = seconds % 60
      p2 = (seconds - p1) / 60
      p3 = (p2 - (p2%60)) / 60
      if (p2 > 59)
        p2 = p2 % 60
    
      if (p1 < 10)
       p1 = "0" + p1
      if (p2 < 10)
       p2 = "0" + p2
      if (p3 < 10)
       p3 = "0" + p3
      return p3 + ":" + p2 + ":" + p1
    },
    convertToSeconds:function(hms){
      let a = hms.split(':')
      let seconds = (parseInt(a[0]) * 60 * 60 + parseInt(a[1]) * 60 + parseInt(a[2]))
      return seconds
    }

}

//Run App.load() when the page is fully loaded including graphics.
$(() => {
    $(window).load(() => {
      App.load()
    })
  })