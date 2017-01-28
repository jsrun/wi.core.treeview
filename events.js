/**
 *  __          __  _    _____ _____  ______ _______                  _               
 *  \ \        / / | |  |_   _|  __ \|  ____|__   __|                (_)              
 *   \ \  /\  / /__| |__  | | | |  | | |__     | |_ __ ___  _____   ___  _____      __
 *    \ \/  \/ / _ \ '_ \ | | | |  | |  __|    | | '__/ _ \/ _ \ \ / / |/ _ \ \ /\ / /
 *     \  /\  /  __/ |_) || |_| |__| | |____ _ | | | |  __/  __/\ V /| |  __/\ V  V / 
 *      \/  \/ \___|_.__/_____|_____/|______(_)|_|_|  \___|\___| \_/ |_|\___| \_/\_/                                                                                
 *                                                                            
 *  @author André Ferreira <andrehrf@gmail.com>
 *  @license MIT
 */

"use strict";

webide.module("treeview", function(){
    this.extends("treeview", {
        /**
         * Function to create treeview
         * 
         * @param string id
         * @return void
         */
        create: function(id, options){
            if(!options)
                options = {};
                        
            $(id).each(function(){
                $(this).fancytree({
                    clickFolderMode: 2,
                    extensions: ["glyph", "persist"],
                    createNode: function(event, data){
                        if(typeof options.contextmenu == "function")
                            options.contextmenu(data.node, data.node.span, data.node.data.type);
                        else
                            webide.treeview._bindContextMenu(data.node, data.node.span, data.node.data.type);
                    },
                    persist: {
                        expandLazy: true,
                        overrideSource: true,
                        store: "local"
                    },
                    glyph: {
                        map: {
                            doc: "fa fa-file-o",
                            docOpen: "fa fa-file-o",
                            checkbox: "fa fa-square-o",
                            checkboxSelected: "fa fa-check-square-o",
                            checkboxUnknown: "fa fa-square",
                            dragHelper: "fa fa-arrow-right",
                            dropMarker: "fa fa-long-arrow-right",
                            error: "fa fa-warning",
                            expanderClosed: "fa fa-caret-right",
                            expanderLazy: "fa fa-angle-right",
                            expanderOpen: "fa fa-caret-down",
                            folder: "fa fa-folder-o",
                            folderOpen: "fa fa-folder-open-o",
                            loading: "fa fa-spinner fa-pulse"
                        }
                    },
                    source: {
                        url: $(this).attr("rel"),
                        cache: false
                    },
                    lazyLoad: function(event, data) {
                        var node = data.node;

                        data.result = {
                            url: $(this).attr("rel"),
                            data: {key: node.key}
                        }
                    },
                    click: function(event, data) {
                        if(data.node.data.type == "file")
                            webide.file.open(data.node.key);
                    }
                });
            });
        },
        
        /**
         * Function for associating contextmenu
         * 
         * @param object node
         * @param object span
         * @param string type
         */
        _bindContextMenu: function(node, span, type){}
    });
});