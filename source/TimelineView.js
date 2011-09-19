enyo.kind({
    name: "WeiboTablet.TimelineView",
    kind: enyo.SlidingView,
    layoutKind: enyo.VFlexLayout,
    components: 
    [{
        kind: enyo.Header,
        style: "min-height: 60px;",
        layoutKind: enyo.HFlexLayout,
        components:
        [{
            kind: enyo.InputBox,
            flex: 1,
            style: "height: 60px;",
            alwaysLooksFocused: true,
            components: 
            [{
                kind: enyo.BasicRichText,
                flex: 1, 
                className: "enyo-input-inner"
            }]
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
                        name: "text",
                        content: ""
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
                            name: "retweetedText",
                            className: "timeline_text_retweeted",
                            content: ""
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
    },{
        kind: enyo.Toolbar,
        pack: "justify",
        components:
        [{
            kind: enyo.GrabButton
        },{
            flex: 1
        }]
    }],
    getTimeline: function(inSender, inIndex)
    {
        var t = this.owner.timeline[inIndex];
        
        if (t) 
        {
            this.$.text.setContent(t.text);
            this.$.username.setContent(t.user.name);
            this.$.profileImage.setSrc(t.user.profile_image_url);
            this.$.createdAt.setContent(WeiboUtil.toShortDate(t.created_at));
            this.$.source.setContent(WeiboUtil.getSource(t.source));
            
            var c = this.getCounts(t.id);
            
            if (parseInt(c.comments) > 0)
        	{
            	this.$.comments.setContent(this.$.comments.getContent() + 
            							   "(" + c.comments + ")");
        	}
            
            if (parseInt(c.rt) > 0)
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
                
                var c = this.getCounts(t.retweeted_status.id);
                
                if (parseInt(c.comments) > 0)
            	{
                	this.$.retweetedComments.setContent(this.$.retweetedComments.getContent() + 
                							   "(" + c.comments + ")");
            	}
                
                if (parseInt(c.rt) > 0)
                {
                	this.$.retweetedRt.setContent(this.$.retweetedRt.getContent() + 
                						 "(" + c.rt	 + ")");
                }
            }
            else
            {
            	this.$.retweetedTimeline.setClassName("none");
            	this.$.retweetedText.setClassName("none");
                this.$.retweetedUsername.setClassName("none");
                this.$.retweetedCreatedAt.setClassName("none");
                this.$.retweetedSource.setClassName("none");
                this.$.retweetedComments.setContent("");
                this.$.retweetedAddToFavorite.setContent("");
                this.$.retweetedRt.setContent("");
            }
            
            return true;
        }
    },
    getCounts: function(id)
    {
    	for (var i = 0; i < this.owner.counts.length; i++)
		{
    		if (this.owner.counts[i].id == id)
			{
    			return this.owner.counts[i];
			}
		}
    }
});