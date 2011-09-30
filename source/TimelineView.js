enyo.kind({
    name: "WeiboTablet.TimelineView",
    kind: enyo.SlidingView,
    layoutKind: enyo.VFlexLayout,
    events:
	{
    	"onTimelineTap": "",
	},
    components: 
    [{
        kind: enyo.Header,
        className: "new_timeline",
        layoutKind: enyo.HFlexLayout,
        components:
        [{
        	content: "picture icon"
        },{
            kind: enyo.Input,
            name: "new_timeline_input",
            oninput: "countCharacters",
            hint: "what",
            alwaysLooksFocused: true,
            flex: 1,
            inputClassName: "new_timeline_input_inner",
            className: "new_timeline_input",
            styled: false
        },{
        	name: "charactersCount",
        	content: "140 left"
        }]
    },{
        kind: enyo.Scroller,
        name: "timeline",
        flex: 1,
        components:
        [{
            kind: enyo.VirtualRepeater,
            onSetupRow: "getTimeline",
            components:
            [{
                kind: enyo.Item,
                layoutKind: enyo.HFlexLayout,
                className: "timeline",
                tapHighlight: true,
                onclick: "timelineTapped",
                components:
                [{
                    kind: enyo.Image, 
                    name: "profileImage",
                    className: "avatar"
                },{
                    kind: enyo.VFlexBox, 
                    pack: "center", 
                    className: "timeline_text",
                    flex: 1, 
                    components: 
                    [{
                        name: "username",
                        className: "timeline_username", 
                        content: ""
                    },{
                    	kind: enyo.HFlexBox,
                    	components:
                		[{
                			kind: enyo.Image, 
                            name: "thumbnailPic",
                            className: "thumbnail_pic"
                		},{
                			name: "text",
                            content: "",
                            flex: 1
                		}]
                    },{
                        kind: enyo.VFlexBox,
                        name: "retweetedTimeline",
                        className: "timeline retweeted",
                        components:
                        [{
                            name: "retweetedUsername",
                            className: "timeline_username_retweeted",
                            content: ""
                        },{
                        	kind: enyo.HFlexBox,
                        	components:
                    		[{
                    			kind: enyo.Image, 
                                name: "retweetedThumbnailPic",
                                className: "thumbnail_pic"
                    		},{
	                            name: "retweetedText",
	                            className: "timeline_text_retweeted",
	                            content: "",
	                            flex: 1
                    		}]
                        },{
                            kind: enyo.HFlexBox,
                            components:
                            [{
                                name: "retweetedCreatedAt",
                                className: "created_at_retweeted grey_text",
                                content: ""
                            },{
                                name: "retweetedSource",
                                className: "source_retweeted grey_text",
                                content: ""
                            },{
                            	flex: 1
                            },{
                            	name: "retweetedRt",
                            	pack: "end",
                            	className: "counts_retweeted grey_text",
                            	content: "转发"
                            },{
                            	name: "retweetedAddToFavorite",
                            	pack: "end",
                            	className: "counts_retweeted grey_text",
                            	content: "收藏"
                            },{
                            	name: "retweetedComments",
                            	pack: "end",
                            	className: "counts_retweeted grey_text",
                            	content: "评论"
                            }]
                        }]
                    },{
                        kind: enyo.HFlexBox,
                        components:
                        [{
                            name: "createdAt",
                            className: "created_at grey_text",
                            content: ""
                        },{
                            name: "source",
                            className: "source grey_text",
                            content: ""
                        },{
                        	flex: 1
                        },{
                        	name: "rt",
                        	pack: "end",
                        	className: "counts grey_text",
                        	content: "转发"
                        },{
                        	name: "addToFavorite",
                        	pack: "end",
                        	className: "counts grey_text",
                        	content: "收藏"
                        },{
                        	name: "comments",
                        	pack: "end",
                        	className: "counts grey_text",
                        	content: "评论"
                        }]
                    }]
                }]
            }]
        }]
    }],
    getTimeline: function(inSender, inIndex)
    {
    	if (!this.timeline)
		{
    		return;
		}
    	
        var t = this.timeline[inIndex];
        
        if (t) 
        {
            this.$.text.setContent(t.text);
            this.$.username.setContent(t.user.name);
            this.$.profileImage.setSrc(t.user.profile_image_url);
            this.$.createdAt.setContent(WeiboUtil.toShortDate(t.created_at));
            this.$.source.setContent(WeiboUtil.getSource(t.source));
            
            if (t.thumbnail_pic)
        	{
            	this.$.thumbnailPic.setSrc(t.thumbnail_pic);
        	}
            else
        	{
            	this.$.thumbnailPic.hide();
        	}
            
            var c = this.getCounts(t.id);
            
            if (c.comments != undefined && parseInt(c.comments) > 0)
        	{
            	this.$.comments.setContent(this.$.comments.getContent() + 
            							   "(" + c.comments + ")");
        	}
            
            if (c.rt != undefined && parseInt(c.rt) > 0)
            {
            	this.$.rt.setContent(this.$.rt.getContent() + 
            						 "(" + c.rt	 + ")");
            }
            
            if (t.retweeted_status)
            {
                this.$.retweetedText.setContent(t.retweeted_status.text);
                this.$.retweetedUsername.setContent(t.retweeted_status.user.name);
                this.$.retweetedCreatedAt.setContent(WeiboUtil.toShortDate(t.retweeted_status.created_at));
                this.$.retweetedSource.setContent(WeiboUtil.getSource(t.retweeted_status.source));
                
                if (t.retweeted_status.thumbnail_pic)
            	{
                	this.$.retweetedThumbnailPic.setSrc(t.retweeted_status.thumbnail_pic);
            	}
                else
            	{
                	this.$.retweetedThumbnailPic.hide();
            	}
                
                var c = this.getCounts(t.retweeted_status.id);
                
                if (c)
            	{
                	if (c.comments != undefined && parseInt(c.comments) > 0)
                	{
                		this.$.retweetedComments.setContent(this.$.retweetedComments.getContent() + 
                				"(" + c.comments + ")");
                	}

                	if (c.rt != undefined && parseInt(c.rt) > 0)
                	{
                		this.$.retweetedRt.setContent(this.$.retweetedRt.getContent() + 
                				"(" + c.rt	 + ")");
                	}
            	}
            }
            else
            {
            	this.$.retweetedTimeline.hide();
            }
            
            return true;
        }
    },
    getCounts: function(id)
    {
    	for (var i = 0; i < this.counts.length; i++)
		{
    		if (this.counts[i].id == id)
			{
    			return this.counts[i];
			}
		}
    },
    countCharacters: function()
    {
    	var length = 139 - this.$.newTimelineInput.value.length;
    	this.$.charactersCount.setContent(length + " left");
    },
    refresh: function(timeline, counts)
    {
    	this.timeline = timeline;
    	this.counts = counts;
    	
    	this.$.timeline.render();
    },
    timelineTapped: function(inSender, inEvent)
    {
    	this.doTimelineTap(this.timeline[inEvent.rowIndex],
    					   this.getCounts(this.timeline[inEvent.rowIndex].id));
    }
});