import { defineConfig } from 'umi';

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
      },
      layout: {
        title: 'Fedomac',
        locale: true
      },
      routes: [
        {
            path: '/',
            name: "index",
            hideInMenu:true,
            component: './'
        },
        {
            // name: 'admin',
            path: 'admin',
            component: './admin'
        },
        {
            path: '/admin/knowledge-base',
            name: 'Knoweledge Base',
            icon: 'bulb',
            routes:[
                {
                    path: '/admin/knowledge-base',
                    redirect: '/admin/knowledge-base/articles',
                },
                {
                    name: 'All Articles',
                    path: '/admin/knowledge-base/articles',    
                    component: './admin/knowledge-base/articles'
                },
                {
                    name: 'Create New Article',
                    path: '/admin/knowledge-base/new',    
                    component: './admin/knowledge-base/create-new'
                }
                
            ]
        }        
      ],
      fastRefresh: {},
});